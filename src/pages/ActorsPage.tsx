import ActorFilters from "@/components/ActorFilters";
import Filters from "@/components/Filters";
import Grid, { SkeletonGrid } from "@/components/Grid";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import { Actor, type ActorParams, type ActorType } from "@/lib/Actor";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const ActorsPage = () => {
  const [actors, setActors] = useState<ActorType[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();

  //Converto da URL a oggetto di tipo ActorParams
  const params = Object.fromEntries(searchParams.entries()) as ActorParams;

  console.log(params);

  //Funzione che aggiorna la griglia di attori quando l'utente imposta dei filtri
  useEffect(() => {

    setLoader(true);

    Actor.get(params).then((actors) => {
      setActors(actors);
      setLoader(false);
    });

  }, [searchParams]);

  //Funzione che rimuove tutti i filtri
  function clearFilters(): void {

    //Verifico se il parametro name sia impostato
    if(!searchParams.get('name')) {
      //Se non lo è, rimuovo tutti i filtri
      setSearchParams({})
    } else {
      //Altrimentri mi salvo il valore vecchio del name, mi creo un nuovo oggetto e gli il vecchio valore che sarà sovrascritto al searchParams precedente
      const prev = searchParams.get('name');
      const next = new URLSearchParams();
      next.set('name', prev!);
      setSearchParams(next);
    }
  }

  function searchActor(value: string): void {

    //Mi prendo il valore precedente
    setSearchParams((prev) => {
      //Mi creo un nuovo oggetto usando i query string disponbili
      const next = new URLSearchParams(prev);

      //Controllo se value è vuoto o no
      if (value) {
        //Se ha valori, concateno alla query string il nuovo parametro con chiave 'name'
        next.set("name", value);
      } else {
        //Altrimenti, se vuoto, rimuovo il filtro name per mostrare tutti gli attori
        next.delete("name");
      }

      //Ritorno il nuovo oggetto
      return next;
    });

  }

  return (
    <main className="container flex flex-col gap-8">
      <h1 className="text-4xl font-semibold text-primary text-center lg:text-left">
        All actors
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <p className="text-center lg:text-left">{actors.length} actors found</p>
        <Filters
          clear={clearFilters}
          applied={Object.keys(params).filter(elem => elem !== 'name').length}
          form={<ActorFilters params={params} setParams={setSearchParams} />}
        />
        <SearchBar onChange={searchActor} defaultValue={params.name} />
      </div>

      {/* Se la lista non viene ancora caricata, mostro lo skeleton come placeholder */}
      {loader && <SkeletonGrid iteration={8} />}

      {actors.length ? (
        <Grid list={actors} name="actors" />
      ) : (
        <NotFound text="No actors found" />
      )}
    </main>
  );
};

export default ActorsPage;
