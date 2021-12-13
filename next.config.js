const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  images: {
    domains: ["res.cloudinary.com", "store.storeimages.cdn-apple.com"],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
});
