"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../../../_components/Loading";
import QnAHeader from "./_components/QnAHeader";
import QnAProgress from "./_components/QnAProgress";
import QnACard from "./_components/QnACard";
import QnANavigation from "./_components/QnANavigation";
import QnACompletion from "./_components/QnACompletion";

function QnAPage() {
    const { courseId } = useParams();
    const router = useRouter();
    const [qnaData, setQnaData] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        GetQnA();
    }, []);

    const GetQnA = async () => {
        try {
            setLoading(true);
            const result = await axios.get(
                `/api/study-type?courseId=${courseId}&type=qa`
            );
            setQnaData(result?.data?.qa?.[0]?.content || []);
        } catch (error) {
            toast.error("Failed to load Q&A");
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (stepCount < qnaData.length - 1) {
            setStepCount((prev) => prev + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handlePrevious = () => {
        if (stepCount > 0) {
            setStepCount((prev) => prev - 1);
        }
    };

    const restartQnA = () => {
        setStepCount(0);
        setIsCompleted(false);
    };

    if (loading) return <Loading />;

    const currentQna = qnaData[stepCount];

    return (
        <div className="max-w-5xl mx-auto px-5 py-10">

            <QnAHeader />

            {!isCompleted ? (
                <>

                    <QnAProgress
                        current={stepCount}
                        total={qnaData.length}
                    />
                    <QnANavigation
                        stepCount={stepCount}
                        total={qnaData.length}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />

                    <QnACard currentQna={currentQna} />

                </>
            ) : (
                <QnACompletion
                    courseId={courseId}
                    onRestart={restartQnA}
                />
            )}
        </div>
    );
}

export default QnAPage;