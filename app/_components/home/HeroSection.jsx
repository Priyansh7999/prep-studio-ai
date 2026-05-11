"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, FileText, Layers3 } from "lucide-react";
import FeatureCard from "./FeatureCard";

function HeroSection({ user }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-primary font-medium mb-4">
            AI Based Learning Platform
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Make your study process simpler and faster
          </h1>
          <p className="text-gray-600 text-lg mt-8 leading-8">
            PrepStudio AI helps students create notes, flashcards, quizzes and question answers automatically using AI.
          </p>
          <div className="flex gap-5 mt-10 flex-wrap">
            {!user ? (
              <Link href="/sign-up">
                <Button size="lg">
                  Start Now
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button size="lg">
                  Open Dashboard
                </Button>
              </Link>
            )}
          </div>
          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <h2 className="text-3xl font-bold text-primary">
                Notes
              </h2>
              <p className="text-gray-500 mt-1">
                AI generated content
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary">
                Quiz
              </h2>
              <p className="text-gray-500 mt-1">
                Practice and revision
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary">
                Flashcards
              </h2>
              <p className="text-gray-500 mt-1">
                Quick learning
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border rounded-3xl p-8">
          <h2 className="text-2xl font-semibold mb-8">
            What you can do
          </h2>
          <div className="space-y-5">
            <FeatureCard
              icon={<FileText className="h-6 w-6 text-primary" />}
              title="Generate Notes"
              description="Create clean and organized study notes instantly."
            />
            <FeatureCard
              icon={<Layers3 className="h-6 w-6 text-primary" />}
              title="Revise with Flashcards"
              description="Quickly revise important concepts and topics."
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-primary" />}
              title="Attempt Quiz"
              description="Practice with AI generated MCQ questions."
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6 text-primary" />}
              title="Question Answers"
              description="Understand topics better with simple explanations."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;