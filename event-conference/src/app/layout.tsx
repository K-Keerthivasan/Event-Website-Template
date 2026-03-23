import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Voltage Summit",
  description: "Premium event and conference website boilerplate for K2 Digital Media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Flash-prevention: apply stored theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('voltage-theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
