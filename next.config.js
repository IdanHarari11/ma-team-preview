/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // הגדרות לשיפור יציבות השרת
  experimental: {
    // שיפור ביצועים
    optimizeCss: true,
    scrollRestoration: true,
  },
  // הגדרות תמונות
  images: {
    domains: ['placehold.co', 'randomuser.me', 'images.unsplash.com'],
    // שיפור טעינת תמונות
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // הגדרות שרת
  serverRuntimeConfig: {
    // הגדלת timeout
    maxDuration: 30,
  },
  // הגדרות webpack (רק כשלא משתמשים ב-Turbopack)
  webpack: (config, { dev, isServer }) => {
    // שיפור ביצועים בפיתוח
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
};

module.exports = nextConfig; 