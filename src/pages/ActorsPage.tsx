import ActorFilters from "@/components/ActorFilters";
import Filters from "@/components/Filters";
import Grid, { SkeletonGrid } from "@/components/Grid";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Actor, type ActorParams, type ActorType } from "@/lib/Actor";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const ActorsPage = () => {
  const [actors, setActors] = useState<ActorType[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams({
    order: "ASC",
    order_by: "id",
  });

  //Converto da URL a oggetto di tipo ActorParams
  const params: ActorParams = Object.fromEntries(
    searchParams.entries()
  ) as ActorParams;

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
    const name = searchParams.get("name");
    const order = searchParams.get("order");
    const order_by = searchParams.get("order_by");

    const next = new URLSearchParams();
    if (name) next.set("name", name);
    if (order) next.set("order", order);
    if (order_by) next.set("order_by", order_by);
    setSearchParams(next);
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

  function orderBy(value: string): void {
    if (!value.includes(":")) return;

    //Gli ordini arrivano in questo formato nome_colonna:ordine
    //Splitto in base al divisore :
    //Destructuring per prendermi i due valori separati
    const [col, order] = value.split(":");

    setSearchParams((prev) => {
      //Mi creo un nuovo oggetto usando i query string disponbili
      const next = new URLSearchParams(prev);

      //Due set, uno per il nome della colonne e uno per l'ordine
      next.set("order_by", col);
      next.set("order", order.toUpperCase());

      //Ritorno il nuovo oggetto
      return next;
    });
  }

  return (
    <main className="container flex flex-col gap-8">
      <h1 className="text-4xl font-semibold text-primary text-center lg:text-left">
        All actors
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <p className="text-center lg:text-left">{actors.length} actors found</p>
        <Filters
          submit={'actorFilters'}
          clear={clearFilters}
          applied={
            Object.keys(params).filter(
              (elem) =>
                elem !== "name" && elem !== "order" && elem !== "order_by"
            ).length
          }
          form={<ActorFilters params={params} setParams={setSearchParams} />}
        />
        <Select onValueChange={orderBy}>
          <SelectTrigger className="w-full lg:w-50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id:asc">Default order</SelectItem>
            <SelectItem value="name:asc">Ascending order</SelectItem>
            <SelectItem value="name:desc">Descending order</SelectItem>
          </SelectContent>
        </Select>
        <SearchBar onChange={searchActor} defaultValue={params.name} />
      </section>

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
