/** @type {import('next').NextConfig} */

const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  experimental: {
    instrumentationHook: true,
    // Necessary to prevent github.com/open-telemetry/opentelemetry-js/issues/4297
    serverComponentsExternalPackages: ["@opentelemetry/sdk-node"],
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  org: "agora-ph",
  project: "agora-next",
};

const sentryOptions = {
  widenClientFileUpload: true,
  transpileClientSDK: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

module.exports = withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions,
  sentryOptions
);
