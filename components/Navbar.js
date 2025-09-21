import Link from "next/link";

export default function Navbar() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="font-bold">Society Panel</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-2 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
