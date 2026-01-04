import type { ActorType } from "@/lib/Actor";
import type { MovieType } from "@/lib/Movie";
import { Link } from "react-router";
import { Skeleton } from "./ui/skeleton";
import type { JSX } from "react";
import type { HallType } from "@/lib/Hall";
import CardComponent from "./ui/CardComponent";

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

const Grid = ({ list, name }: GridProps) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {list.map((elem: MovieType | ActorType | HallType, index) => (
        <Link key={index} to={`/${name}/${elem.id}`} className="flex">
          <div className="p-1 w-full">
            <CardComponent elem={elem} name={name} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Grid;
