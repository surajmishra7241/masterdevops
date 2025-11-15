import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-cyber-darker text-white">
      <body className="relative min-h-screen flex flex-col bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

