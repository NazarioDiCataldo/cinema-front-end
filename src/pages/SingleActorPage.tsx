import AvatarsList from "@/components/AvatarsList";
import { Skeleton } from "@/components/ui/skeleton";
import { Actor, type ActorType } from "@/lib/Actor";
import { type MovieType } from "@/lib/Movie";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const SingleActorPage = () => {
  const params = useParams();
  const [actor, setActor] = useState<ActorType>();
  const [movies, setMovies] = useState<MovieType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Actor.single(params.id!)
      .then((actor) => setActor(actor))
      .catch(() => navigate("/actors"));

    //Get dei film collegati all'attore
    Actor.movies(params.id!).then((movies) => setMovies(movies));
  }, [params.id]);

  if (!actor) {
    return (
      <main className="container">
        <section className="flex  flex-wrap lg:flex-nowrap gap-8">
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
        to={"/actors"}
      >
        <ArrowLeft className="size-5" />
        Return to actors
      </Link>
      <section className="flex gap-8">
        <picture className="w-1/2 aspect-square">
          <img
            className="w-full h-auto"
            src={actor.image_path}
            alt={`Portrait about ${actor.name}`}
          />
        </picture>
        <aside className="w-1/2 flex flex-col gap-4 pt-4">
          <h1 className="text-4xl text-primary font-semibold">{actor.name}</h1>
          <p>
            <strong>Birthday year</strong>: {actor.birth_year}
          </p>
          <p>
            <strong>Nationality</strong>: {actor.nationality}
          </p>
          {movies.length > 0 && (
            <AvatarsList title="Filmography" list={movies} route={"movies"} />
          )}
        </aside>
      </section>
    </main>
  );
};

export default SingleActorPage;
