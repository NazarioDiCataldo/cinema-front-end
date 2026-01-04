import type { MovieType } from "@/lib/Movie";
import { Card, CardContent } from "./card";
import type { ActorType } from "@/lib/Actor";
import type { HallType } from "@/lib/Hall";

type CardComponentProps = {
  elem: MovieType | ActorType | HallType;
  name: "movies" | "actors" | "halls";
};

//Mi creo i tipi di dati che andranno inseriti nella card
type CardComponentType = {
  title: string;
  subtitle?: string;
  image: string;
};

//Type Union per legare elem al tipo effetto -> name === 'actors' -> type ActorType
type CardItem =
  | { type: "actors"; elem: ActorType }
  | { type: "movies"; elem: MovieType }
  | { type: "halls"; elem: HallType };

const CardComponent = ({ elem, name }: CardComponentProps) => {
  const IMAGE_PLACEHOLDER = `https://www.jobfarm.it/fad/wp-content/uploads/2022/12/placeholder.png`;

  //Funzione helper che crea il giusto CardItem
  function makeCardItem(
    name: "actors" | "movies" | "halls",
    elem: ActorType | MovieType | HallType
  ): CardItem {
    switch (name) {
      case "actors":
        return { type: "actors", elem: elem as ActorType };
      case "movies":
        return { type: "movies", elem: elem as MovieType };
      case "halls":
        return { type: "halls", elem: elem as HallType };
    }
  }

  //Mi serve per una corretta tipizzazione dei dati, in base alla risorsa
  function getCardData(item: CardItem): CardComponentType {
    switch (item.type) {
      case "actors":
        return {
          title: item.elem.name,
          subtitle: item.elem.nationality,
          image: elem.image_path ?? IMAGE_PLACEHOLDER,
        };

      case "movies":
        return {
          title: item.elem.title,
          subtitle: item.elem.production_year?.toString(),
          image: elem.image_path ?? IMAGE_PLACEHOLDER,
        };

      case "halls":
        return {
          title: item.elem.name,
          subtitle: item.elem.city,
          image: elem.image_path ?? IMAGE_PLACEHOLDER,
        };
    }
  }

  const card: CardComponentType = getCardData(makeCardItem(name, elem));

  return (
    <Card className="p-0 cursor-pointer">
      <CardContent className="flex flex-col aspect-square items-start justify-start p-0">
        <figure className=" w-full ">
          <img
            className="w-full h-full aspect-square object-cover max-h-64"
            src={card.image}
            alt={`Image about ${card.title}`}
          />
          <figcaption className="w-full p-4 text-center lg:text-left">
            <h3 className="text-xl text-primary font-semibold ">
              {card.title}
            </h3>
            {/* Mostro il sottitolo, che è diverso per ogni tipo di risorsa */}
            <p className="text-md font-normal dark:text-white/60">
              {card.subtitle}
            </p>
          </figcaption>
        </figure>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
