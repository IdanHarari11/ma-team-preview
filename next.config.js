/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co', 'randomuser.me', 'images.unsplash.com']
  }
};

module.exports = nextConfig; 