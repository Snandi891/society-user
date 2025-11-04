import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  LogOut,
  Home as HomeIcon,
  Phone,
  Users,
  Megaphone,
  RotateCw,
  Send,
  User,
  AlertCircle,
  CheckCircle,
  Bell,
  Settings,
  MessageSquare,
  Calendar,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Eye,
  Clock,
  Heart,
  Zap,
  Cloud,
  Sun,
  Moon,
  Search,
  Filter,
  Download,
  Upload,
  Crown,
  Award,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Coffee,
  Wifi,
  Car,
  TreePine,
  Dumbbell,
  Palette,
  Music,
  BookOpen,
  Camera,
  Gamepad2,
} from "lucide-react";

export default function MemberHome() {
  const [member, setMember] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [complaint, setComplaint] = useState({ subject: "", description: "" });
  const [sending, setSending] = useState(false);
  const [complaintMsg, setComplaintMsg] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [userStatus, setUserStatus] = useState("active");

  const canvasRef = useRef(null);
  const router = useRouter();

  // Floating particles animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: isDark
          ? `rgba(255,255,255,${Math.random() * 0.1})`
          : `rgba(100,100,255,${Math.random() * 0.1})`,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isDark]);

  useEffect(() => {
    const savedMember = localStorage.getItem("member");
    if (savedMember) {
      const memberData = JSON.parse(savedMember);
      setMember(memberData);

      // Simulate advanced loading sequence
      setTimeout(() => {
        fetchAnnouncements();
        setIsLoading(false);

        // Generate sample notifications
        setNotifications([
          {
            id: 1,
            type: "success",
            message: "Welcome to NexusLiving Premium!",
            time: "Just now",
            read: false,
          },
          {
            id: 2,
            type: "info",
            message: "Maintenance scheduled for tomorrow",
            time: "2 hours ago",
            read: true,
          },
          {
            id: 3,
            type: "warning",
            message: "Parking lot cleaning in progress",
            time: "1 day ago",
            read: true,
          },
        ]);
      }, 1800);
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

      const isChanged =
        JSON.stringify(newAnnouncements) !== JSON.stringify(announcements);
      setAnnouncements(newAnnouncements);

      if (isChanged && newAnnouncements.length > 0) {
        setToastMessage("🎉 Announcements updated successfully!");
        setTimeout(() => setToastMessage(""), 4000);
      }
    } catch (err) {
      console.error("Error fetching announcements", err);
      setAnnouncements([]);
      setToastMessage("⚠️ Failed to fetch announcements");
      setTimeout(() => setToastMessage(""), 4000);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  const handleComplaintChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    if (!complaint.subject || !complaint.description) {
      setComplaintMsg("⚠️ Please fill all fields before submitting.");
      return;
    }
    setSending(true);
    setComplaintMsg("");

    try {
      const res = await fetch("/api/complaints/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flatNumber: member.flatNumber,
          name: member.name,
          complaintText: `Subject: ${complaint.subject}\nDescription: ${complaint.description}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setComplaintMsg(
          "🎉 Complaint submitted successfully! We'll get back to you soon."
        );
        setComplaint({ subject: "", description: "" });

        // Add to notifications
        setNotifications((prev) => [
          {
            id: Date.now(),
            type: "success",
            message: "Complaint submitted successfully",
            time: "Just now",
            read: false,
          },
          ...prev,
        ]);
      } else {
        setComplaintMsg("⚠️ " + data.message);
      }
    } catch (err) {
      console.error(err);
      setComplaintMsg("❌ Failed to send complaint. Please try again.");
    } finally {
      setSending(false);
      setTimeout(() => setComplaintMsg(""), 5000);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  if (!member || isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-purple-900 transition-all duration-1000">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin mx-auto"></div>
            <div className="w-32 h-32 border-4 border-transparent border-t-purple-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center animate-pulse shadow-2xl">
                <HomeIcon className="text-white" size={36} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-pulse">
              Initializing NexusLiving
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Loading your premium experience...
            </p>
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-purple-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50"
      } relative overflow-hidden`}
    >
      {/* Advanced Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: isDark ? "screen" : "multiply" }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-pink-300/10 dark:bg-pink-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(${
                isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
              } 1px, transparent 1px), linear-gradient(90deg, ${
                isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
              } 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in-down">
          <div
            className={`backdrop-blur-xl rounded-2xl p-4 border shadow-2xl transform transition-all duration-500 hover:scale-105 ${
              isDark
                ? "bg-gray-800/90 text-white border-gray-700 shadow-purple-500/10"
                : "bg-white/95 text-gray-800 border-gray-200 shadow-blue-500/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center animate-pulse">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <p className="font-semibold">{toastMessage}</p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Just now
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Navigation Header */}
      <header
        className={`relative backdrop-blur-xl border-b transition-all duration-500 ${
          isDark
            ? "bg-gray-900/80 border-gray-800"
            : "bg-white/80 border-gray-200/50"
        } sticky top-0 z-50`}
      >
        <div className="max-w-8xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25 transform group-hover:scale-110 transition-all duration-500">
                  <HomeIcon className="text-white" size={32} />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400/20 rounded-full blur-sm animate-ping"></div>
              </div>
              <div>
                <h1
                  className={`text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text`}
                >
                  NexusLiving
                </h1>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Premium Community Experience
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div
                className={`relative rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700 focus-within:border-purple-500/50"
                    : "bg-white/50 border-gray-300 focus-within:border-blue-500/50"
                }`}
              >
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search announcements, complaints, members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-transparent outline-none rounded-2xl ${
                    isDark
                      ? "text-white placeholder-gray-400"
                      : "text-gray-800 placeholder-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-110 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700 text-yellow-400 hover:bg-gray-700/50"
                    : "bg-white/50 border-gray-300 text-gray-600 hover:bg-white"
                }`}
              >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </button>

              {/* Notifications */}
              <div className="relative group">
                <button
                  className={`p-3 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-110 ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"
                      : "bg-white/50 border-gray-300 hover:bg-white"
                  }`}
                >
                  <Bell
                    className={isDark ? "text-gray-300" : "text-gray-600"}
                    size={22}
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                </button>

                {/* Notifications Dropdown */}
                <div
                  className={`absolute top-full right-0 w-96 backdrop-blur-xl rounded-3xl border shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-4 ${
                    isDark
                      ? "bg-gray-800/95 border-gray-700"
                      : "bg-white/95 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className={`font-bold text-lg ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Notifications
                    </h3>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        isDark
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {notifications.filter((n) => !n.read).length} new
                    </span>
                  </div>

                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markNotificationAsRead(notification.id)}
                        className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                          notification.read
                            ? isDark
                              ? "bg-gray-700/50 border-gray-600"
                              : "bg-gray-50 border-gray-200"
                            : isDark
                            ? "bg-blue-500/10 border-blue-500/30"
                            : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              notification.type === "success"
                                ? "bg-green-500/20 text-green-400"
                                : notification.type === "warning"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {notification.type === "success" && (
                              <CheckCircle size={16} />
                            )}
                            {notification.type === "warning" && (
                              <AlertCircle size={16} />
                            )}
                            {notification.type === "info" && <Bell size={16} />}
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-medium ${
                                isDark ? "text-white" : "text-gray-800"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <p
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div
                className={`flex items-center gap-4 backdrop-blur-sm px-5 py-3 rounded-2xl border transition-all duration-500 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-700 hover:border-purple-500/50"
                    : "bg-white/50 border-gray-300 hover:border-blue-500/50"
                } group cursor-pointer`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-500">
                    {member.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden lg:block">
                  <p
                    className={`font-bold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {member.name}
                  </p>
                  <p
                    className={`text-sm flex items-center gap-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Crown size={14} className="text-yellow-500" />
                    Premium Member
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  localStorage.removeItem("member");
                  router.push("/member-login");
                }}
                className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3.5 rounded-2xl font-bold hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-red-500/25 border border-red-400/30 group"
              >
                <LogOut
                  size={20}
                  className="group-hover:rotate-180 transition-transform duration-500"
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Premium Navigation Tabs */}
      <div className="relative max-w-8xl mx-auto px-8 pt-8">
        <div
          className={`backdrop-blur-xl rounded-3xl p-2 border shadow-2xl transition-all duration-500 ${
            isDark
              ? "bg-gray-900/50 border-gray-800"
              : "bg-white/50 border-gray-200/50"
          } mx-auto w-fit`}
        >
          <div className="flex gap-1">
            {[
              {
                id: "dashboard",
                label: "Dashboard",
                icon: HomeIcon,
                color: "from-blue-500 to-cyan-500",
                badge: "3",
              },
              {
                id: "complaints",
                label: "Complaints",
                icon: AlertCircle,
                color: "from-red-500 to-pink-500",
                badge: "1",
              },
              {
                id: "announcements",
                label: "Announcements",
                icon: Megaphone,
                color: "from-purple-500 to-pink-500",
                badge: "5",
              },
              {
                id: "messages",
                label: "Messages",
                icon: MessageSquare,
                color: "from-green-500 to-emerald-500",
                badge: "2",
              },
              {
                id: "facilities",
                label: "Facilities",
                icon: TreePine,
                color: "from-orange-500 to-amber-500",
                badge: null,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-500 relative group overflow-hidden ${
                    activeTab === tab.id
                      ? `text-white bg-gradient-to-r ${tab.color} shadow-2xl transform scale-105`
                      : isDark
                      ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white"
                  }`}
                >
                  <Icon size={24} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>

                  {tab.badge && (
                    <span
                      className={`relative z-10 px-2 py-1 rounded-full text-xs font-bold ${
                        activeTab === tab.id
                          ? "bg-white/20 text-white"
                          : isDark
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-purple-100 text-purple-600"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}

                  {/* Active Indicator */}
                  {activeTab === tab.id && (
                    <>
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full animate-bounce"></div>
                    </>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Premium Main Content Area */}
      <main className="relative max-w-8xl mx-auto px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            {/* Premium Welcome Hero */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl shadow-purple-500/25 transform transition-all duration-500 hover:scale-[1.01] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-40 translate-y-40"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-5xl font-black">
                        Welcome back, {member.name}! 👋
                      </h2>
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/30">
                        <span className="font-bold flex items-center gap-2">
                          <Crown className="text-yellow-300" size={20} />
                          PREMIUM
                        </span>
                      </div>
                    </div>
                    <p className="text-blue-100 text-xl opacity-90 max-w-3xl leading-relaxed">
                      Your premium community dashboard is fully optimized.
                      Everything is running smoothly in your neighborhood today.
                      <span className="block mt-2 text-white/80">
                        🎯 <strong>3 new updates</strong> since your last visit
                      </span>
                    </p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 transform hover:scale-110 transition-all duration-500 border border-white/30">
                    <Zap className="text-white" size={42} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: HomeIcon, text: `🏠 Flat ${member.flatNumber}` },
                    {
                      icon: Users,
                      text: `👨‍👩‍👧‍👦 ${member.familyCount} Family Members`,
                    },
                    { icon: Award, text: "⭐ Community Rating: 4.8/5" },
                    { icon: Activity, text: "📈 128 Active Days" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30 transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="font-semibold">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BarChart3,
                  label: "Community Engagement",
                  value: "87%",
                  change: "+5.2%",
                  color: "from-blue-500 to-blue-600",
                  trend: "up",
                  description: "Higher than average",
                },
                {
                  icon: PieChart,
                  label: "Facility Usage",
                  value: "64%",
                  change: "+12.8%",
                  color: "from-green-500 to-green-600",
                  trend: "up",
                  description: "Peak hours: 6-8 PM",
                },
                {
                  icon: Target,
                  label: "Issue Resolution",
                  value: "94%",
                  change: "+2.1%",
                  color: "from-purple-500 to-purple-600",
                  trend: "up",
                  description: "48h average response",
                },
                {
                  icon: Activity,
                  label: "Energy Consumption",
                  value: "1.2kW",
                  change: "-8.3%",
                  color: "from-orange-500 to-orange-600",
                  trend: "down",
                  description: "Eco-friendly usage",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`rounded-3xl p-6 backdrop-blur-sm border-2 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer ${
                    isDark
                      ? `bg-gray-800/50 border-gray-700 hover:border-${
                          stat.color.split("-")[1]
                        }-500/50`
                      : `bg-white/80 border-gray-200 hover:border-${
                          stat.color.split("-")[1]
                        }-200`
                  } shadow-xl hover:shadow-2xl`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                    >
                      <stat.icon className="text-white" size={28} />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-gray-800 dark:text-white">
                        {stat.value}
                      </div>
                      <div
                        className={`text-sm font-semibold flex items-center gap-1 ${
                          stat.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        <TrendingUp
                          size={14}
                          className={stat.trend === "down" ? "rotate-180" : ""}
                        />
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <h3
                    className={`font-bold text-lg mb-1 ${
                      isDark ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {stat.label}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    } mb-3`}
                  >
                    {stat.description}
                  </p>
                  <div
                    className={`w-12 h-1 bg-gradient-to-r ${stat.color} rounded-full mt-2 group-hover:w-full transition-all duration-500`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Premium Quick Actions & Activity Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div
                className={`rounded-3xl p-8 backdrop-blur-sm border-2 transition-all duration-500 ${
                  isDark
                    ? "bg-gray-900/50 border-gray-800 hover:border-purple-500/30"
                    : "bg-white/80 border-gray-200/50 hover:border-purple-200"
                } xl:col-span-2`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Zap className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-800 dark:text-white">
                      Quick Actions
                    </h3>
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                      Instant access to community features
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      icon: AlertCircle,
                      label: "Submit Complaint",
                      color: "red",
                      tab: "complaints",
                      desc: "Report issues",
                      featured: true,
                    },
                    {
                      icon: Megaphone,
                      label: "Announcements",
                      color: "purple",
                      tab: "announcements",
                      desc: "Latest news",
                      featured: false,
                    },
                    {
                      icon: MessageSquare,
                      label: "Send Message",
                      color: "blue",
                      tab: "messages",
                      desc: "Contact management",
                      featured: false,
                    },
                    {
                      icon: Calendar,
                      label: "Book Facility",
                      color: "green",
                      tab: "facilities",
                      desc: "Reserve amenities",
                      featured: true,
                    },
                    {
                      icon: Download,
                      label: "Documents",
                      color: "orange",
                      tab: "documents",
                      desc: "Download files",
                      featured: false,
                    },
                    {
                      icon: Upload,
                      label: "Payments",
                      color: "emerald",
                      tab: "payments",
                      desc: "Make payments",
                      featured: true,
                    },
                    {
                      icon: Settings,
                      label: "Settings",
                      color: "gray",
                      tab: "settings",
                      desc: "Preferences",
                      featured: false,
                    },
                    {
                      icon: Users,
                      label: "Directory",
                      color: "indigo",
                      tab: "directory",
                      desc: "Member contacts",
                      featured: false,
                    },
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(action.tab)}
                      className={`p-6 rounded-2xl text-left transition-all duration-500 transform hover:scale-105 group relative overflow-hidden ${
                        isDark
                          ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
                          : "bg-white hover:bg-gray-50 border border-gray-200"
                      } shadow-lg hover:shadow-xl ${
                        action.featured ? "ring-2 ring-yellow-400/50" : ""
                      }`}
                    >
                      {action.featured && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      )}
                      <div
                        className={`w-14 h-14 bg-${action.color}-100 dark:bg-${action.color}-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                      >
                        <action.icon
                          className={`text-${action.color}-600 dark:text-${action.color}-400`}
                          size={28}
                        />
                      </div>
                      <h4 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">
                        {action.label}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {action.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity & Community Stats */}
              <div className="space-y-8">
                {/* Recent Activity */}
                <div
                  className={`rounded-3xl p-8 backdrop-blur-sm border-2 transition-all duration-500 ${
                    isDark
                      ? "bg-gray-900/50 border-gray-800 hover:border-blue-500/30"
                      : "bg-white/80 border-gray-200/50 hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl">
                        <Activity className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-800 dark:text-white">
                          Recent Activity
                        </h3>
                        <p
                          className={isDark ? "text-gray-400" : "text-gray-600"}
                        >
                          Your latest interactions
                        </p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        type: "complaint",
                        text: "Water supply issue reported",
                        time: "2 hours ago",
                        status: "in-progress",
                        icon: AlertCircle,
                        color: "yellow",
                        priority: "high",
                      },
                      {
                        type: "announcement",
                        text: "New maintenance schedule published",
                        time: "1 day ago",
                        status: "completed",
                        icon: Megaphone,
                        color: "green",
                        priority: "medium",
                      },
                      {
                        type: "payment",
                        text: "Maintenance fee received",
                        time: "3 days ago",
                        status: "completed",
                        icon: CheckCircle,
                        color: "blue",
                        priority: "low",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer ${
                          isDark
                            ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
                            : "bg-white hover:bg-gray-50 border border-gray-200"
                        } shadow-lg hover:shadow-xl`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 bg-${activity.color}-100 dark:bg-${activity.color}-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                          >
                            <activity.icon
                              className={`text-${activity.color}-600 dark:text-${activity.color}-400`}
                              size={24}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-800 dark:text-white">
                              {activity.text}
                            </p>
                            <p
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              } flex items-center gap-2 mt-1`}
                            >
                              <Clock size={14} />
                              {activity.time}
                            </p>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              activity.status === "in-progress"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400"
                                : "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400"
                            }`}
                          >
                            {activity.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community Facilities */}
                <div
                  className={`rounded-3xl p-6 backdrop-blur-sm border-2 transition-all duration-500 ${
                    isDark
                      ? "bg-gray-900/50 border-gray-800"
                      : "bg-white/80 border-gray-200/50"
                  }`}
                >
                  <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <TreePine size={20} />
                    Available Facilities
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: Swimming,
                        name: "Pool",
                        status: "Open",
                        color: "green",
                      },
                      {
                        icon: Dumbbell,
                        name: "Gym",
                        status: "24/7",
                        color: "blue",
                      },
                      {
                        icon: Car,
                        name: "Parking",
                        status: "Available",
                        color: "green",
                      },
                      {
                        icon: Wifi,
                        name: "WiFi",
                        status: "Strong",
                        color: "green",
                      },
                    ].map((facility, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-2xl text-center transition-all duration-300 hover:scale-105 ${
                          isDark ? "bg-gray-800/50" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                            facility.color === "green"
                              ? "bg-green-100 text-green-600"
                              : facility.color === "blue"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {facility.icon === Swimming && <Coffee size={16} />}
                          {facility.icon === Dumbbell && <Dumbbell size={16} />}
                          {facility.icon === Car && <Car size={16} />}
                          {facility.icon === Wifi && <Wifi size={16} />}
                        </div>
                        <div className="text-xs font-semibold text-gray-800 dark:text-white">
                          {facility.name}
                        </div>
                        <div
                          className={`text-xs ${
                            facility.color === "green"
                              ? "text-green-600"
                              : facility.color === "blue"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        >
                          {facility.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Complaints Tab */}
        {activeTab === "complaints" && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div
              className={`rounded-3xl backdrop-blur-sm border-2 p-8 transition-all duration-500 ${
                isDark
                  ? "bg-gray-900/50 border-gray-800"
                  : "bg-white/80 border-gray-200/50"
              } shadow-2xl`}
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/25">
                  <AlertCircle className="text-white" size={42} />
                </div>
                <div>
                  <h2 className="text-5xl font-black text-gray-800 dark:text-white mb-3">
                    Submit a Complaint
                  </h2>
                  <p
                    className={`text-xl ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    We're committed to resolving your concerns with premium
                    support
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitComplaint} className="space-y-8">
                <div className="space-y-4">
                  <label
                    className={`block text-2xl font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Brief description of your issue..."
                    value={complaint.subject}
                    onChange={handleComplaintChange}
                    className={`w-full p-6 text-xl rounded-3xl border-2 transition-all duration-500 focus:scale-105 ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-gray-800"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-red-500/50 focus:bg-white"
                    } focus:outline-none focus:shadow-2xl focus:shadow-red-500/10`}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label
                    className={`block text-2xl font-black ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Detailed Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Please provide detailed information about your complaint. Include specific dates, times, locations, and any relevant details that can help us address your concern effectively..."
                    value={complaint.description}
                    onChange={handleComplaintChange}
                    rows="8"
                    className={`w-full p-6 text-xl rounded-3xl border-2 transition-all duration-500 resize-none ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-red-500/50 focus:bg-gray-800"
                        : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-red-500/50 focus:bg-white"
                    } focus:outline-none focus:shadow-2xl focus:shadow-red-500/10`}
                    required
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center justify-center gap-4 flex-1 py-6 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-3xl font-black text-xl hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:hover:scale-100 shadow-2xl hover:shadow-red-500/25 border border-red-400/30 group"
                  >
                    {sending ? (
                      <>
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting your complaint...</span>
                      </>
                    ) : (
                      <>
                        <Send
                          size={28}
                          className="group-hover:translate-x-2 transition-transform duration-500"
                        />
                        <span>Submit Premium Complaint</span>
                        <Zap
                          size={24}
                          className="text-yellow-300 animate-pulse"
                        />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="px-8 py-6 rounded-3xl font-bold border-2 transition-all duration-500 hover:scale-105 shadow-xl"
                    onClick={() =>
                      setComplaint({ subject: "", description: "" })
                    }
                  >
                    Clear
                  </button>
                </div>

                {complaintMsg && (
                  <div
                    className={`p-6 rounded-3xl border-2 backdrop-blur-sm transform transition-all duration-500 animate-fade-in ${
                      complaintMsg.includes("✅")
                        ? isDark
                          ? "bg-green-500/10 border-green-500/30 text-green-400 shadow-2xl shadow-green-500/10"
                          : "bg-green-50 border-green-200 text-green-700 shadow-2xl shadow-green-200/50"
                        : isDark
                        ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-2xl shadow-red-500/10"
                        : "bg-red-50 border-red-200 text-red-700 shadow-2xl shadow-red-200/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {complaintMsg.includes("✅") ? (
                        <CheckCircle
                          size={32}
                          className="text-green-500 animate-bounce"
                        />
                      ) : (
                        <AlertCircle
                          size={32}
                          className="text-red-500 animate-pulse"
                        />
                      )}
                      <span className="text-xl font-bold">{complaintMsg}</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div
              className={`rounded-3xl backdrop-blur-sm border-2 p-8 transition-all duration-500 ${
                isDark
                  ? "bg-gray-900/50 border-gray-800"
                  : "bg-white/80 border-gray-200/50"
              } shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
                    <Megaphone className="text-white" size={42} />
                  </div>
                  <div>
                    <h2 className="text-5xl font-black text-gray-800 dark:text-white mb-3">
                      Community Announcements
                    </h2>
                    <p
                      className={`text-xl ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Stay informed with the latest premium updates and news
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-500 hover:scale-105 ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    } shadow-lg border ${
                      isDark ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <Filter size={20} />
                    Filter
                  </button>
                  <button
                    onClick={fetchAnnouncements}
                    disabled={loadingAnnouncements}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-500 hover:scale-105 ${
                      isDark
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    } shadow-lg border ${
                      isDark ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    <RotateCw
                      size={20}
                      className={loadingAnnouncements ? "animate-spin" : ""}
                    />
                    {loadingAnnouncements ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
              </div>

              {Array.isArray(announcements) && announcements.length > 0 ? (
                <div className="space-y-6">
                  {announcements.map((a, index) => (
                    <div
                      key={a._id || index}
                      className={`p-8 rounded-3xl border-2 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer ${
                        isDark
                          ? "bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-purple-500/50"
                          : "bg-gradient-to-r from-white to-gray-50/50 border-gray-200 hover:border-purple-200"
                      } shadow-xl hover:shadow-2xl`}
                    >
                      <div className="flex items-start gap-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                          <Megaphone className="text-white" size={32} />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-2xl leading-relaxed font-semibold ${
                              isDark ? "text-gray-200" : "text-gray-800"
                            } mb-4`}
                          >
                            {a.message}
                          </p>
                          <div className="flex items-center gap-6">
                            <div
                              className={`flex items-center gap-3 text-lg ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              <Calendar size={20} />
                              {a.createdAt
                                ? new Date(a.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )
                                : "Recent"}
                            </div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <div
                              className={`flex items-center gap-3 text-lg ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              <Clock size={20} />
                              {a.createdAt
                                ? new Date(a.createdAt).toLocaleTimeString()
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-40 h-40 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Megaphone
                      className="text-gray-400 dark:text-gray-600"
                      size={64}
                    />
                  </div>
                  <h3 className="text-4xl font-black text-gray-600 dark:text-gray-400 mb-6">
                    No announcements yet
                  </h3>
                  <p
                    className={`text-xl max-w-md mx-auto mb-8 ${
                      isDark ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    There are no announcements at the moment. Check back later
                    for premium updates from your community management.
                  </p>
                  <button
                    onClick={fetchAnnouncements}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-5 rounded-3xl font-black text-xl hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25"
                  >
                    Check for Premium Updates
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div
              className={`rounded-3xl backdrop-blur-sm border-2 p-12 text-center ${
                isDark
                  ? "bg-gray-900/50 border-gray-800"
                  : "bg-white/80 border-gray-200/50"
              } shadow-2xl`}
            >
              <div className="w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/25">
                <MessageSquare className="text-white" size={64} />
              </div>
              <h3 className="text-5xl font-black text-gray-800 dark:text-white mb-6">
                Premium Messaging
              </h3>
              <p
                className={`text-2xl max-w-2xl mx-auto mb-8 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Connect instantly with your neighbors and community management
                through our exclusive premium messaging platform.
              </p>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-5 rounded-3xl font-black text-xl inline-block shadow-2xl shadow-emerald-500/25 transform hover:scale-105 transition-all duration-500">
                🚀 Launching Soon
              </div>
              <div className="mt-8 flex justify-center space-x-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Facilities Tab */}
        {activeTab === "facilities" && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div
              className={`rounded-3xl backdrop-blur-sm border-2 p-12 text-center ${
                isDark
                  ? "bg-gray-900/50 border-gray-800"
                  : "bg-white/80 border-gray-200/50"
              } shadow-2xl`}
            >
              <div className="w-40 h-40 bg-gradient-to-r from-orange-400 to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-500/25">
                <TreePine className="text-white" size={64} />
              </div>
              <h3 className="text-5xl font-black text-gray-800 dark:text-white mb-6">
                Premium Facilities
              </h3>
              <p
                className={`text-2xl max-w-2xl mx-auto mb-8 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Access and book our exclusive community facilities with premium
                scheduling and real-time availability.
              </p>
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-12 py-5 rounded-3xl font-black text-xl inline-block shadow-2xl shadow-amber-500/25 transform hover:scale-105 transition-all duration-500">
                🏊‍♂️ Coming Next Update
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Ultra Premium Footer */}
      <footer
        className={`relative border-t mt-20 backdrop-blur-xl transition-all duration-500 ${
          isDark
            ? "border-gray-800 bg-gray-900/50"
            : "border-gray-200/50 bg-white/50"
        }`}
      >
        <div className="max-w-8xl mx-auto px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-6 lg:mb-0">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <HomeIcon className="text-white" size={28} />
              </div>
              <div>
                <p className="font-black text-2xl text-gray-800 dark:text-white">
                  NexusLiving
                </p>
                <p
                  className={`text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  World-Class Community Experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8 mb-6 lg:mb-0">
              {[
                { icon: Heart, label: "Support", color: "red" },
                { icon: Shield, label: "Privacy", color: "blue" },
                { icon: Settings, label: "Terms", color: "gray" },
                { icon: Crown, label: "Premium", color: "yellow" },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 hover:scale-110 group ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={`text-${item.color}-500 group-hover:scale-110 transition-transform duration-500`}
                  />
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
            </div>

            <div
              className={`text-center lg:text-right ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p className="font-black text-lg">© 2024 NexusLiving Platform</p>
              <p className="text-sm font-medium">
                Crafted with ❤️ for exceptional community living experiences
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper components for icons
const Swimming = ({ size, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);
