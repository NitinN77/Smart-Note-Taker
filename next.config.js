/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withCSS = require('@zeit/next-css')
module.exports = withCSS()

module.exports = nextConfig
const removeImports = require('next-remove-imports')();
module.exports = removeImports({});