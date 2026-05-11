"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function MaterialCardItem({
    item,
    studyTypeContent,
    course,
    refreshData,
}) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRoute = (path) => {
        router.push(path);
    };

    const isContentReady = () => {
        if (!studyTypeContent) return false;

        const content =
            studyTypeContent[item.type.toLowerCase()];

        if (!content) return false;

        return content.length > 0;
    };

    const GenerateContent = async () => {
        try {
            setLoading(true);

            toast.loading("Generating content...");

            let chapters = "";

            course?.courseLayout?.chapters?.forEach(
                (chapter) => {
                    chapters += `${chapter.chapterTitle}, `;
                }
            );

            await axios.post(
                "/api/generate-study-type-content",
                {
                    courseId: course?.courseId,
                    chapters,
                    type: item.type,
                }
            );

            refreshData(true);

            toast.dismiss();

            toast.success(
                "Content generated successfully"
            );
        } catch (error) {
            console.error(error);

            toast.dismiss();

            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const contentReady = isContentReady();

    return (

        <div className={`border shadow-md rounded-lg p-5 flex flex-col justify-between items-center
                ${!contentReady && studyTypeContent?.[item.type]?.length == null && "grayscale"}`}>

            {!contentReady ? (
                <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
                    Generate
                </h2>
            ) : (
                <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
                    Ready
                </h2>
            )}

            <Image
                src={item.icon}
                alt={item.name}
                width={50}
                height={50}
            />

            <h2 className="font-medium mt-3">
                {item.name}
            </h2>

            <p className="text-gray-500 text-sm text-center">
                {item.desc}
            </p>

            {!contentReady ? (
                <Button
                    className="mt-3 w-full"
                    variant="outline"
                    onClick={GenerateContent}
                >
                    {loading && (
                        <RefreshCcw className="animate-spin mr-2 h-4 w-4" />
                    )}

                    Generate
                </Button>
            ) : (
                <div className="w-full flex flex-col gap-2 mt-3">

                    {/* VIEW BUTTON */}

                    <Button
                        className="w-full"
                        onClick={() =>
                            handleRoute(
                                `/course/${course?.courseId}/${item.path}`
                            )
                        }
                    >
                        View
                    </Button>

                    {/* REGENERATE BUTTON ONLY FOR NON-NOTES */}

                    {item.type !== "notes" && (
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={GenerateContent}
                        >
                            {loading && (
                                <RefreshCcw className="animate-spin mr-2 h-4 w-4" />
                            )}

                            Re-Generate
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default MaterialCardItem;
