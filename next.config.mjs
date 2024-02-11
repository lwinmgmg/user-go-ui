/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
		return [
			{
				source: '/api/user/:path*',
				destination: `${process.env.USER_BACKEND}/user/api/:path*`,
			},
		]
	},
};

export default nextConfig;
