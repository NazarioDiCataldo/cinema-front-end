import Filters from "@/components/Filters";
import Grid, { SkeletonGrid } from "@/components/Grid";
import HallFilters from "@/components/HallFilters";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hall, type HallParams, type HallType } from "@/lib/Hall";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const HallsPage = () => {
  const [halls, setHalls] = useState<HallType[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams({
    order: "ASC",
    order_by: "id",
  });

  //Converto da URL a oggetto di tipo MovieParams
  const params: HallParams = Object.fromEntries(
    searchParams.entries()
  ) as HallParams;

  useEffect(() => {
    setLoader(true);

    Hall.get(params).then((halls) => {
      setHalls(halls);
      setLoader(false);
    });
  }, [searchParams]);

  //Funzione che rimuove tutti i filtri
  function clearFilters(): void {
    //Verifico se il parametro name sia impostato
    const title = searchParams.get("title");
    const order = searchParams.get("order");
    const order_by = searchParams.get("order_by");

    const next = new URLSearchParams();
    if (title) next.set("title", title);
    if (order) next.set("order", order);
    if (order_by) next.set("order_by", order_by);
    setSearchParams(next);
  }

  function orderBy(value: string): void {
    //verifico prima se la stringa contiene il divisore
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

  function searchHall(value: string): void {
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
    <main className="container">
      <h1 className="text-4xl font-semibold text-primary text-center lg:text-left">
        All halls
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <p className="text-center lg:text-left">{halls.length} halls found</p>
        <Filters
          submit={"hallFilters"}
          clear={clearFilters}
          applied={
            Object.keys(params).filter(
              (elem) =>
                elem !== "name" && elem !== "order" && elem !== "order_by"
            ).length
          }
          form={<HallFilters params={params} setParams={setSearchParams} />}
        />
        <Select onValueChange={orderBy}>
          <SelectTrigger className="w-full lg:w-50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id:asc">Default order</SelectItem>
            <SelectItem value="name:asc">Ascending order</SelectItem>
            <SelectItem value="name:desc">Descending order</SelectItem>
            <SelectItem value="place:asc">Less places</SelectItem>
            <SelectItem value="place:desc">More places</SelectItem>
          </SelectContent>
        </Select>
        <SearchBar onChange={searchHall} defaultValue={params.name} />
      </section>

      {/* Se la lista non viene ancora caricata, mostro lo skeleton come placeholder */}
      {loader && <SkeletonGrid iteration={8} />}

      {halls.length ? (
        <Grid list={halls} name={"halls"} />
      ) : (
        <NotFound text="No halls found" />
      )}
    </main>
  );
};

export default HallsPage;
