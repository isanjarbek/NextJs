/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  reactStrictMode: true,
  images: {
    loader: "cloudinary",
    domains: ["https://akbar-rich.s3.us-east-1.amazonaws.com/"],
    path: "https://res.cloudinary.com/nolbir-io/image/fetch/",
  },
  i18n: {
    locales: ["uz", "en"],
    defaultLocale: "uz",
  },
};

module.exports = nextConfig;
