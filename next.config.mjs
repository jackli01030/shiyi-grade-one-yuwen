/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "shiyi-grade-one-yuwen";

const nextConfig = {
  allowedDevOrigins: ["192.168.50.3"],
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? `/${repoName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repoName}/` : undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
