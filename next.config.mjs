/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shop.apaym.com'
            }, {
                protocol: "https",
                "hostname": "www.icegif.com"
            }
        ]
    }
};

export default nextConfig;
