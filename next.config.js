/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Fix workspace root detection warning on Windows
  outputFileTracingRoot: require('path').join(__dirname),
}

module.exports = nextConfig
