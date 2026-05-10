import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FlashcardItem from "./FlashcardItem";

function FlashcardCarousel({ flashCards, flippedIndex, setFlippedIndex, setApi }) {
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent>
        {flashCards.map((flashcard, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center"
          >
            <FlashcardItem
              flashcard={flashcard}
              isFlipped={flippedIndex === index}
              onFlip={() =>
                setFlippedIndex(
                  flippedIndex === index ? null : index
                )
              }
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-center gap-5 mt-10">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
}

export default FlashcardCarousel;