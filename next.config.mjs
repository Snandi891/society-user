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
    ];
  },
};

export default nextConfig;
