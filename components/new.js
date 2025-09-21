import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LogOut, User, Mail, ShieldCheck } from "lucide-react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🚀 My Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              router.push("/login");
            }}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0)}
            </div>
            <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            {user.guest ? (
              <span className="mt-3 inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm rounded-full">
                Guest Mode
              </span>
            ) : (
              <span className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                Verified User
              </span>
            )}
          </div>
        </div>

        {/* Stats / Quick Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-blue-500" size={20} /> Account Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-xl shadow">
              <p className="text-sm">Username</p>
              <h4 className="text-xl font-bold mt-1">{user.name}</h4>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-4 rounded-xl shadow">
              <p className="text-sm">Email</p>
              <h4 className="text-xl font-bold mt-1">{user.email}</h4>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow">
              <p className="text-sm">Role</p>
              <h4 className="text-xl font-bold mt-1">
                {user.guest ? "Guest" : "Member"}
              </h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
