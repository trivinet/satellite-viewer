/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-data-grid'],
  env:{
    MAPBOX_ACCESS_TOKEN:
      "[MAPBOX_TOKEN]",
  },
};

module.exports = nextConfig;