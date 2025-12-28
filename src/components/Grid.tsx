import type { ActorType } from "@/lib/Actor";
import type { MovieType } from "@/lib/Movie";
import { Link } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { JSX } from "react";

type GridProps = {
  name: "actors" | "movies";
  list: ActorType[] | MovieType[];
};

type SkeletonGridProps = {
    iteration: number;
}

export function SkeletonGrid({iteration}: SkeletonGridProps): JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(iteration)].map((_, i) => (
                <Skeleton key={i} className="aspect-square h-64 rounded-xl w-full bg-gray-500" />  
            ))}
        </div>
    );
}

const Grid = (props: GridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {props.list.map((elem: MovieType | ActorType, index) => (
        <Link key={index} to={`/${props.name}/${elem.id}`} className="flex">
          <div className="p-1 w-full">
            <Card className="p-0 cursor-pointer">
              <CardContent className="flex flex-col items-start justify-start p-0">
                <picture className="aspect-square w-full max-h-64">
                  <img
                    className="w-full h-full object-cover"
                    src={elem.image_path}
                  />
                </picture>
                <h3 className="w-full text-xl text-primary font-semibold p-6 text-center lg:text-left">
                  {elem.name ?? elem.title}
                </h3>
              </CardContent>
            </Card>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Grid;
