/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/Sheet",
        destination: "/sheet",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "uploadthing.com",
    ],
  },
};

module.exports = nextConfig;
