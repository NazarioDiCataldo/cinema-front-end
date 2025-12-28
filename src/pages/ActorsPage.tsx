import Grid, { SkeletonGrid } from "@/components/Grid";
import { Actor, type ActorType } from "@/lib/Actor";
import { useEffect, useState } from "react";

const ActorsPage = () => {
  const [actors, setActors] = useState<ActorType[]>([]);

  useEffect(() => {
    Actor.get().then((actors) => setActors(actors));
    //tutto quello che c'è dopo non aspetterà che la promise si risolva
  }, [actors]);

  return <main className="container py-8 flex flex-col gap-8">
    <h1 className="text-4xl font-semibold text-primary text-center lg:text-left">All actors</h1>
    {/* Se la lista non viene ancora caricata, mostro lo skeleton come placeholder */}
    {
      actors.length 
      ? <Grid list={actors} name="actors" /> 
      : <SkeletonGrid iteration={8} />
    }
  </main>;
};

export default ActorsPage;
