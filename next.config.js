module.exports = {
  output: 'export',
  distDir: 'output',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  images: {
    unoptimized: true // You may need this if there's any relevant error occurring while building.
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}