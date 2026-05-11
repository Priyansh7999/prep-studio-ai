"use client";
import Navbar from "./_components/home/Navbar";
import HeroSection from "./_components/home/HeroSection";
import FeaturesSection from "./_components/home/FeaturesSection";
import Footer from "./_components/home/Footer";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} />
      <HeroSection user={user} />
      <FeaturesSection user={user} />
      <Footer />
    </div>
  );
}