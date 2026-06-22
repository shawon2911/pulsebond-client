import Image from "next/image";
import "./globals.css";
import Features from "@/Components/Features";
import Banner from "@/Components/Banner";
import ContactUs from "@/Components/Contact";


export default function Home() {
  return (
    <main>
      <Banner />
      <Features />
      <ContactUs />
    </main>
  )
  
}
