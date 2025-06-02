import type { Metadata } from 'next'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'Todo App',
    template: '%s | Todo App'
  },
  description: 'A modern todo application built with Next.js and shadcn/ui',
  keywords: ['todo', 'productivity', 'nextjs', 'shadcn'],
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
