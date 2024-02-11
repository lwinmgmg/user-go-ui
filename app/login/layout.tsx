import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'User Login',
    description: 'User login page',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-full">
            {children}
        </main>
    );
}