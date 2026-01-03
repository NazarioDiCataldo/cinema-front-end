import AvatarsList from "@/components/AvatarsList";
import { Button } from "@/components/ui/button";
import DeleteResource from "@/components/ui/DeleteResource";
import { Skeleton } from "@/components/ui/skeleton";
import type { ActorType } from "@/lib/Actor";
import { Movie, type MovieType } from "@/lib/Movie";
import { ArrowLeft, Pen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const SingleMoviePage = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieType>();
  const [actors, setActors] = useState<ActorType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    //Get del film tramite id
    Movie.single(params.id!)
      .then((movie) => setMovie(movie))
      .catch(() => navigate("/movies"));

    //Get degli attori collegati al film
    Movie.actors(params.id!).then((actors) => setActors(actors));
  }, [params.id]);

  if (!Movie) {
    return (
      <main className="container">
        <section className="flex gap-8">
          <Skeleton className="h-100 w-1/2 bg-gray-500" />
          <div className="w-1/2 flex flex-col gap-4">
            <Skeleton className="h-16 bg-gray-500" />
            <Skeleton className="h-12 bg-gray-500" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <Link
        className="text-primary underline w-max flex gap-1 items-center"
        to={"/movies"}
      >
        <ArrowLeft className="size-5" />
        Return to movies
      </Link>
      <section className="flex flex-wrap lg:flex-nowrap gap-8">
        <picture className="w-full lg:w-1/2 aspect-square">
          <img
            className="size-full object-cover"
            src={movie?.image_path}
            alt={`Poster about ${movie?.title}`}
          />
        </picture>
        <aside className="w-full lg:w-1/2 flex flex-col gap-4 pt-4">
          <h1 className="text-4xl text-primary font-semibold">
            {movie?.title}
          </h1>
          <p>
            <strong>Production year</strong>: {movie?.production_year}
          </p>
          <p>
            <strong>Nationality</strong>: {movie?.nationality}
          </p>
          <p>
            <strong>Director</strong>: {movie?.director}
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
            <DeleteResource
              trigger={
                <Button size={"lg"} variant={"destructive"}>
                  <Trash2 />
                  Delete
                </Button>
              }
            />
            <Link to={`/Movies/${movie?.id}/update`}>
              <Button
                size={"lg"}
                variant={"outline"}
                className={"w-max shadow-xl"}
              >
                <Pen />
                Edit Movie
              </Button>
            </Link>
          </div>
          {actors.length > 0 && <AvatarsList title="Casting" list={actors} route={'actors'} />}
        </aside>
      </section>
    </main>
  );
};

export default SingleMoviePage;
