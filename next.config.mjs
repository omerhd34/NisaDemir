/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
  qualities: [75, 100],
 },
 experimental: {
  inlineCss: true,
  staleTimes: {
   dynamic: 0,
   static: 30,
  },
 },
};

export default nextConfig;
