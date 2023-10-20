/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// next.config.js
module.exports = {
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
}

