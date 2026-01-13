import Filters from "@/components/Filters";
import Grid, { SkeletonGrid } from "@/components/Grid";
import HallFilters from "@/components/HallFilters";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
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

  //Variabili per il valore di default della select dell'ordinamento
  const defaultOrderBy = params.order_by ?? searchParams.get("order_by")!; //Prende il query params dall'url, se esisite, altrimenti dall'oggetto searchParams che sicuramente avrà il parametro, visto che glielo imposto manualmente
  const defaultOrder = (
    params.order ?? searchParams.get("order")!
  ).toLowerCase();

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
        <NativeSelect
          defaultValue={`${defaultOrderBy}:${defaultOrder}`}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            orderBy(e.currentTarget.value)
          }
          className="w-full lg:w-50"
        >
          <NativeSelectOption value="">Select order</NativeSelectOption>
          <NativeSelectOption value="id:asc">Default order</NativeSelectOption>
          <NativeSelectOption value="name:asc">
            Ascending order
          </NativeSelectOption>
          <NativeSelectOption value="name:desc">
            Descending order
          </NativeSelectOption>
          <NativeSelectOption value="place:asc">Less places</NativeSelectOption>
          <NativeSelectOption value="place:desc">
            More places
          </NativeSelectOption>
        </NativeSelect>
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
