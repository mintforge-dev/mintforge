/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  experimental: {
    turbo: {
      resolveAlias: {
        crypto: "crypto-browserify",
        stream: "stream-browserify",
        url: "url",
        zlib: "browserify-zlib",
        http: "stream-http",
        https: "https-browserify",
        assert: "assert",
        os: "os-browserify/browser",
        path: "path-browserify",
        buffer: "buffer",
      },
    },
  },
  // Suppress hydration warning dari browser extensions
  reactStrictMode: false,
};

module.exports = nextConfig;
