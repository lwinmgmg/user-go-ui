/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
		return [
			{
				source: '/api/user/:path*',
				destination: `${process.env.USER_BACKEND}/:path*`,
			},
		]
	},
};

export default nextConfig;
