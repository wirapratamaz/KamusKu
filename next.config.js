/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add more configurations here if needed
  images: {
    domains: [
      "asset-a.grid.id",
      "encrypted-tbn0.gstatic.com",
      "akcdn.detik.net.id",
    ],
  },
};

module.exports = nextConfig;
