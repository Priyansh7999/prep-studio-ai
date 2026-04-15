import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import { Toaster } from "sonner";

export const metadata = {
  title: "PrepStudio AI",
  description: "PrepStudio AI is an AI-powered learning platform that provides personalized study materials and resources to help students prepare for their exams effectively.",
};

const outfit = Outfit({
  subsets: ["latin"],
  // variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={outfit.className}
        >
          <Provider>
            {children}
          </Provider>
          <Toaster />

        </body>
      </html>
    </ClerkProvider>
  );
}
