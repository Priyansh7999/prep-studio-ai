const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'), // or path.resolve(__dirname, 'src') if you use a src folder
    };
    return config;
  },
};

module.exports = nextConfig;
