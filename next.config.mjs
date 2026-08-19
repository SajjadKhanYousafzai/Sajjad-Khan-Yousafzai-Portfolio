/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let basePath = '';
let assetPrefix = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.replace(/.*?\//, '') : '';
  if (repo) {
    basePath = `/${repo}`;
    assetPrefix = `/${repo}/`;
  }
}

const nextConfig = {
  output: 'export',
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
