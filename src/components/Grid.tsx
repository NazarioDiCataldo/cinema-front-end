import type { ActorType } from "@/lib/Actor";
import type { MovieType } from "@/lib/Movie";
import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { JSX } from "react";
import type { HallType } from "@/lib/Hall";

type GridProps = {
  name: "actors" | "movies" | "halls";
  list: ActorType[] | MovieType[] | HallType[];
};

type SkeletonGridProps = {
  iteration: number;
};

export function SkeletonGrid({ iteration }: SkeletonGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(iteration)].map((_, i) => (
        <Skeleton
          key={i}
          className="aspect-square h-64 rounded-xl w-full bg-gray-500"
        />
      ))}
    </div>
  );
}

const Grid = ({list, name}: GridProps) => {
  const IMAGE_PLACEHOLDER = `https://www.jobfarm.it/fad/wp-content/uploads/2022/12/placeholder.png`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {list.map((elem: MovieType | ActorType | HallType, index) => (
        <Link key={index} to={`/${name}/${elem.id}`} className="flex">
          <div className="p-1 w-full">
            <Card className="p-0 cursor-pointer">
              <CardContent className="flex flex-col items-start justify-start p-0">
                <figure className=" w-full ">
                  <img
                    className="w-full h-full aspect-square object-cover max-h-64"
                    src={elem.image_path ?? IMAGE_PLACEHOLDER}
                  />
                  <figcaption className="w-full p-4 text-center lg:text-left">
                    <h3 className="text-xl text-primary font-semibold ">
                      {elem.name ?? elem.title}
                    </h3>
                    {/* Mostro la nazionalità dell'attore */}
                    {elem.nationality && name == 'actors' && (
                      <p className="text-md font-normal dark:text-white/60">
                        {elem.nationality}
                      </p>
                    )}
                    {/* Mostro la città della sala come sottotitolo */}
                    {elem.city && (
                      <p className="text-md font-normal dark:text-white/60">
                        {elem.city}
                      </p>
                    )}
                    {/* Mostro l'anno di uscita del film */}
                    {elem.production_year && (
                      <p className="text-md font-normal dark:text-white/60">
                        {elem.production_year}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Grid;
