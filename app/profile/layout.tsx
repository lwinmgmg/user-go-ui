import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile page',
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