/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
