/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/members",
        destination: "https://society-admin-eosin.vercel.app/api/members",
      },
      {
        source: "/api/users/register",
        destination:
          "https://society-admin-eosin.vercel.app/api/users/register",
      },
      {
        source: "/api/users/login",
        destination: "https://society-admin-eosin.vercel.app/api/users/login",
      },
      {
        source: "/api/members/login",
        destination: "https://society-admin-eosin.vercel.app/api/members/login",
      },
      {
        source: "/api/announcements/get",
        destination:
          "https://society-admin-eosin.vercel.app/api/announcements/get",
      },
      {
        source: "/api/complaints/add",
        destination: "http://10.147.230.17:3000/api/complaints/add",
      },
      {
        source: "/api/guest-visit",
        destination: "http://10.147.230.17:3000/api/guest-visit",
      },
    ];
  },
};

export default nextConfig;
