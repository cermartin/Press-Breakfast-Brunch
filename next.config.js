/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Fix workspace root detection warning on Windows
  outputFileTracingRoot: require('path').join(__dirname),
  env: {
    NEXT_PUBLIC_APP_VERSION: require('./package.json').version,
  },
}

module.exports = nextConfig
