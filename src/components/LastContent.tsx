import { Actor, type ActorType } from "@/lib/Actor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Movie, type MovieType } from "@/lib/Movie";
import { Loader2 } from "lucide-react";
import { Hall } from "@/lib/Hall";
import CardComponent from "./ui/CardComponent";

type LastContentProps = {
  name: "actors" | "movies" | "halls";
  limit: number;
  order?: "ASC" | "DESC";
};

const LastContent = ({ name, limit, order }: LastContentProps) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function getResource() {
      switch (name) {
        case "actors":
          setList(await Actor.get({ limit, order }));
          break;

        case "movies":
          setList(await Movie.get({ limit, order }));
          break;

        case "halls":
          setList(await Hall.get({ limit, order }));
          break;
      }
    }

    getResource();
  }, [name]);

  return (
    <section className="container mt-8 flex flex-col gap-4">
      <h2 className="text-primary text-3xl font-semibold text-center lg:text-left">
        Last {name} loaded
      </h2>
      {list.length ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {list.map((elem: MovieType | ActorType, index) => (
              <Link
                to={`/${name}/${elem.id}`}
                className="flex min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <CarouselItem key={index}>
                  <div className="p-1">
                    <CardComponent elem={elem} name={name} />
                  </div>
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" size={'icon-lg'} />
          <CarouselNext className="hidden lg:flex" size={'icon-lg'} />
        </Carousel>
      ) : (
        <Loader2 className="animate-spin text-primary size-12" />
      )}
    </section>
  );
};

export default LastContent;

