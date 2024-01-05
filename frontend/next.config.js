/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/overview', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
  // // Can be safely removed in newer versions of Next.js
  // future: {
  //   // by default, if you customize webpack config, they switch back to version 4.
  //   // Looks like backward compatibility approach.
  //   webpack5: true,
  // },
  // webpack(config) {
  //   config.resolve.fallback = {
  //     // if you miss it, all the other options in fallback, specified
  //     // by next.js will be dropped.
  //     ...config.resolve.fallback,
  //     fs: false, // the solution
  //   }
  //   return config;
  // },
}

module.exports = nextConfig
