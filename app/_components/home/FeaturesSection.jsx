"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
const data = [
    "Saves time during revision",
    "Easy to use interface",
    "AI generated learning material",
    "Helpful for quick preparation",
]
function FeaturesSection({ user }) {
    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">
                        Why use PrepStudio AI?
                    </h2>
                    <p className="text-gray-600 mt-4 text-lg">
                        A simple platform focused on helping students study better.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-white border rounded-3xl p-8">
                        <h3 className="text-2xl font-semibold mb-6">
                            Main Benefits
                        </h3>
                        <div className="space-y-5">
                            {data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    <CheckCircle2 className="text-primary h-5 w-5" />

                                    <p className="text-gray-700">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-primary text-white rounded-3xl p-8">
                        <h3 className="text-3xl font-bold">
                            Start learning smarter
                        </h3>
                        <p className="mt-5 leading-8 text-white/90">
                            Create your study material in seconds and improve
                            your preparation process with AI.
                        </p>
                        <div className="mt-8">
                            {!user ? (
                                <Link href="/sign-up">
                                    <Button variant="secondary">
                                        Create Account
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/dashboard">
                                    <Button variant="secondary">
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;