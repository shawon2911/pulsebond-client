import { Fraunces, Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
})

export const metadata = {
  title: "PulseBond | Connecting Lives Through Blood Donation",
  description: "Connecting Lives Through Blood Donation",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="font-body bg-paper text-ink min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
    
        </body>
    </html>
  );
}
