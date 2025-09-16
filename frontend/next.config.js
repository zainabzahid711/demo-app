/** @type {import('next').NextConfig} */
const nextConfig = {
  // Important for Docker: Output a standalone build
  output: "standalone",
  // Allow your frontend to call the backend (which will be at http://backend:5000 from inside the Docker network)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:5000/api/:path*", // Proxy to backend
      },
    ];
  },
};

module.exports = nextConfig;
