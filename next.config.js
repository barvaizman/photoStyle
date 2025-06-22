// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  env: {
    SANITY_PROJECT_ID: 'peolo2q1',
    SANITY_DATASET: 'production',
  },
}

module.exports = nextConfig
