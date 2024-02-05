import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'User Sign Up',
    description: 'Sign Up Page',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            {children}
        </main>
    );
}
