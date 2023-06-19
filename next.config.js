/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/overview', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
