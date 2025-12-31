import { Button } from "@/components/ui/button";
import DeleteActor from "@/components/ui/DeleteActor";
import { Skeleton } from "@/components/ui/skeleton";
import { Actor, type ActorType } from "@/lib/Actor";
import { Pen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const SingleActorPage = () => {
  const params = useParams();
  const [actor, setActor] = useState<ActorType>();
  const navigate = useNavigate();

  useEffect(() => {
    Actor.single(params.id!)
      .then((actor) => setActor(actor))
      .catch(() => navigate("/actors"));
  }, [params.id]);

  if (!actor) {
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
          <div className="flex flex-col lg:flex-row gap-4">
            <DeleteActor
              trigger={
                <Button size={"lg"} variant={"destructive"}>
                  <Trash2 />
                  Delete
                </Button>
              }
            />
            <Link to={`/actors/${actor.id}/update`}>
              <Button
                size={"lg"}
                variant={"outline"}
                className={"w-max shadow-xl"}
              >
                <Pen />
                Edit actor
              </Button>
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default SingleActorPage;
