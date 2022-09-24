/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'gateway.pinata.cloud', 'stonedapeclub.mypinata.cloud', 'ipfs.io', 'ipfs.fleek.co',
      'res.cloudinary.com', 'ipfs.fleek.io', 'cloudflare-ipfs.com', 'arweave.net',
      'lh3.googleusercontent.com'
    ],
  },
}

module.exports = nextConfig
