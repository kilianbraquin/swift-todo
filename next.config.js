/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
