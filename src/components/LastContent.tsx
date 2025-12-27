import { Actor } from "@/lib/Actor";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useEffect, useState } from "react";
import { Link } from "react-router";

type LastContentProps = {
    name: 'actors' | 'movies' | 'halls',
    limit: number,
    order?: 'ASC' | 'DESC'
}

const LastContent = ({name, limit, order}: LastContentProps) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        async function getResource() {
            switch(name) {
                case 'actors': 
                    setList(await Actor.get({limit, order}));
                    break;

                case 'movies': 
                    setList(await Actor.get({limit, order}));
                    break;
            }
        };

        getResource();
    }, [name]);

  return (
    <section className="container mt-8 flex flex-col gap-4">
        <h2 className="text-primary text-3xl font-semibold">Last {name} loaded</h2>
      <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      className="w-full"
    >
      <CarouselContent>
        {list.map((elem, index) => (
            <Link to={`/${name}/${elem.id}`} className="flex min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3">
                <CarouselItem key={index}>
                    <div className="p-1">
                    <Card className="p-0 cursor-pointer">
                        <CardContent className="flex flex-col aspect-square items-start justify-start p-0">
                            <picture className="w-full h-64">
                                <img className="w-full h-full object-cover" src={elem.image_path} />
                            </picture>
                        <h3 className="text-xl text-primary font-semibold p-6">{elem.name ?? elem.title}</h3>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
            </Link>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden lg:flex' />
      <CarouselNext className='hidden lg:flex' />
    </Carousel>
    </section>
  );
};

export default LastContent;
