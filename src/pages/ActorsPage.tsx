import Grid, { SkeletonGrid } from "@/components/Grid";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import { Actor, type ActorType } from "@/lib/Actor";
import { useEffect, useState } from "react";

const ActorsPage = () => {
  const [actors, setActors] = useState<ActorType[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    Actor.get().then((actors) => {
      setActors(actors);
      setLoader(false);
    });
    //tutto quello che c'è dopo non aspetterà che la promise si risolva
  }, []);

  function searchActor(value: string): void {
    //Se l'utente non digita nulla, vengono mostrati tutti gli attori
    setLoader(true);
    if (!value) {
      Actor.get().then((actors) => {
        setActors(actors);
        setLoader(false);
      });
      //Esco infine dalla funzione
      return;
    }

    //Se l'utente ha inserito qualcosa, invio il parametro e imposto lo state
    Actor.get({ name: value }).then((actors) => {
      setActors(actors)
      setLoader(false);
    });
  }

  return (
    <main className="container flex flex-col gap-8">
      <h1 className="text-4xl font-semibold text-primary text-center lg:text-left">
        All actors
      </h1>
      {/* Se la lista non viene ancora caricata, mostro lo skeleton come placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <p className="text-center lg:text-left">{actors.length} actors founds</p>
        <SearchBar onChange={searchActor} />
      </div>

      {loader && <SkeletonGrid iteration={8} />}

      {actors.length ? (
        <Grid list={actors} name="actors" />
      ) : (
        <NotFound text="Actor not found" />
      )}
    </main>
  );
};

export default ActorsPage;
