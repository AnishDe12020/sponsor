module.exports = {
  images: {
    domains: ["res.cloudinary.com", "store.storeimages.cdn-apple.com"],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
}
