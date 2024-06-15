/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shop.apaym.com'
            }
        ]
    }
};

export default nextConfig;
