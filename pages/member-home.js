import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  LogOut,
  Home as HomeIcon,
  Phone,
  Users,
  Megaphone,
  RotateCw,
} from "lucide-react";

export default function MemberHome() {
  const [member, setMember] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedMember = localStorage.getItem("member");
    if (savedMember) {
      setMember(JSON.parse(savedMember));
      fetchAnnouncements();
    } else {
      router.replace("/member-login");
    }
  }, [router]);

  const fetchAnnouncements = async () => {
    try {
      setLoadingAnnouncements(true);
      const res = await fetch("/api/announcements/get");
      const data = await res.json();

      let newAnnouncements = [];
      if (Array.isArray(data)) newAnnouncements = data;
      else if (Array.isArray(data.announcements))
        newAnnouncements = data.announcements;

      // Check if announcements have changed
      const isChanged =
        JSON.stringify(newAnnouncements) !== JSON.stringify(announcements);
      setAnnouncements(newAnnouncements);

      if (isChanged && newAnnouncements.length > 0) {
        setToastMessage("Announcements updated!");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error fetching announcements", err);
      setAnnouncements([]);
      setToastMessage("Failed to fetch announcements");
      setTimeout(() => setToastMessage(""), 3000);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  if (!member)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <header className="backdrop-blur-md bg-white/70 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            🏠 Member Dashboard
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem("member");
              router.push("/member-login");
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform shadow-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Profile Card */}
        <div className="relative bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-4xl font-bold shadow-md">
              {member.name?.charAt(0) || "?"}
            </div>
            <h2 className="mt-4 text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {member.name || "Unnamed"}
            </h2>
            <p className="text-gray-500">Flat {member.flatNumber || "N/A"}</p>
          </div>
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs shadow">
            Active
          </div>
        </div>

        {/* Family & Contact Info */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <p className="text-sm opacity-80 flex items-center gap-1">
              <HomeIcon size={16} /> Flat Number
            </p>
            <h4 className="text-2xl font-bold mt-2">
              {member.flatNumber || "N/A"}
            </h4>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <p className="text-sm opacity-80 flex items-center gap-1">
              <Phone size={16} /> Phone
            </p>
            <h4 className="text-2xl font-bold mt-2">
              {member.phone || "Hidden"}
            </h4>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <p className="text-sm opacity-80 flex items-center gap-1">
              <Users size={16} /> Family Members
            </p>
            <h4 className="text-2xl font-bold mt-2">
              {member.familyCount ?? 0}
            </h4>
          </div>
        </div>
      </main>

      {/* 📢 Announcements Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            <Megaphone size={22} /> Announcements
          </h2>
          <button
            onClick={fetchAnnouncements}
            disabled={loadingAnnouncements}
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition disabled:opacity-50"
          >
            <RotateCw
              size={16}
              className={loadingAnnouncements ? "animate-spin" : ""}
            />
            {loadingAnnouncements ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {toastMessage && (
          <div className="mb-4 p-2 bg-green-500 text-white rounded shadow">
            {toastMessage}
          </div>
        )}

        {Array.isArray(announcements) && announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((a) => (
              <div
                key={a._id || Math.random()}
                className="bg-white/70 backdrop-blur-md shadow-md p-4 rounded-xl border-l-4 border-blue-500"
              >
                <p className="text-gray-700">{a.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {a.createdAtIST || ""}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No announcements yet.</p>
        )}
      </section>
    </div>
  );
}
