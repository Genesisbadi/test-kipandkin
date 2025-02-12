const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const runtimeCaching = require("next-pwa/cache");

// Add custom runtime caching to exclude specific URLs
const customRuntimeCaching = [
  ...runtimeCaching,
  {
    // Exclude static.triptease.io from caching
    urlPattern: /^https:\/\/static\.triptease\.io\/.*/,
    handler: "NetworkOnly",
  },
  {
    // Exclude onboard.triptease.io from caching
    urlPattern: /^https:\/\/onboard\.triptease\.io\/.*/,
    handler: "NetworkOnly",
  },
];

const withPWA = require("next-pwa")({
  dest: "public",
  sw: "service-worker.js",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
  runtimeCaching: customRuntimeCaching, // Use the custom runtime caching
  buildExcludes: [/middleware-manifest.json$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    // Remove console logs only in production
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    loader: "custom",
    loaderFile: "./lib/utils/cloudfrontLoader.jsx",
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_TENANT_S3_HOSTNAME,
        port: "",
        pathname: `/**`,
      },
      {
        protocol: "https",
        hostname: "haspcms-discovery-suites.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: `/**`,
      },
      {
        protocol: "https",
        hostname: "d3s2eyc2s4knf3.cloudfront.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: `/vi/**`,
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
