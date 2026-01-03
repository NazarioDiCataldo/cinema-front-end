import type { ActorType } from "@/lib/Actor";
import type { MovieType } from "@/lib/Movie";
import { Link } from "react-router";
import { AnimatedList } from "./ui/animated-list";
import { cn } from "@/lib/utils";

type AvatarsListProps = {
  title: string;
  route: "actors" | "movies";
  list: MovieType[] | ActorType[];
};

const AvatarsList = ({ title, list, route }: AvatarsListProps) => {
  return (
    <div className="flex flex-col gap-4 mt-4 max-w-100">
      <h2 className="text-2xl text-primary font-medium">{title}</h2>
      {list.map((elem) => (
        <Link to={`/${route}/${elem.id}`} key={elem.id}>
          <AnimatedList className="max-w-100">
            <figure
              className={cn(
                "relative min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4 shadow-xl!",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
              )}
            >
              <div className="flex flex-row items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl">
                  <img
                    className="size-12 aspect-square rounded-full object-cover"
                    alt={`Picture about ${elem.image_path}`}
                    src={elem.image_path}
                  />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
                    <span className="text-sm sm:text-lg">
                      {elem.name ?? elem.title}
                    </span>
                  </figcaption>
                  {elem.production_year && (
                    <p className="text-sm font-normal dark:text-white/60">
                      {elem.production_year}
                    </p>
                  )}
                </div>
              </div>
            </figure>
          </AnimatedList>
        </Link>
      ))}
    </div>
  );
};

export default AvatarsList;
