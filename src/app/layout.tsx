import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

const IBMPlexMono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Simple Form",
    description: "Create by MahoMuri",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const currentUser = JSON.parse(
    //     getCookie("__user")?.toString() || "{}"
    // ) as User | null;
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${poppins.variable} ${IBMPlexMono.variable} antialiased`}
            >
                <ThemeProvider
                    attribute={"class"}
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="min-h-dvh flex flex-col items-center justify-center">
                        <AuthProvider>{children}</AuthProvider>
                    </main>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
