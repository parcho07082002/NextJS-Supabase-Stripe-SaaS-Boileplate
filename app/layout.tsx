import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  try {
                    const storedTheme = localStorage.getItem('theme')
                    if (storedTheme === 'light' || storedTheme === 'dark') {
                      return storedTheme
                    }
                    if (storedTheme === 'system' || !storedTheme) {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
                    }
                    return 'light' // Fallback
                  } catch (e) {
                    return 'light' // Fallback if localStorage is not available
                  }
                }

                try {
                  const theme = getTheme()
                  document.documentElement.setAttribute('data-theme', theme)
                } catch (e) {
                  console.error('Failed to set initial theme:', e)
                }
                
                // Listen for theme changes across tabs
                window.addEventListener('storage', function(e) {
                  if (e.key === 'theme') {
                    try {
                      const newTheme = e.newValue === 'system' 
                        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                        : (e.newValue || getTheme()) // Use getTheme as fallback if newValue is null
                      document.documentElement.setAttribute('data-theme', newTheme)
                    } catch (e) {
                      console.error('Failed to sync theme:', e)
                    }
                  }
                })

                // Listen for system theme changes
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
                mediaQuery.addEventListener('change', function() {
                  const storedTheme = localStorage.getItem('theme')
                  if (storedTheme === 'system') {
                    document.documentElement.setAttribute(
                      'data-theme',
                      mediaQuery.matches ? 'dark' : 'light'
                    )
                  }
                })
              })()
            `,
          }}
        />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
