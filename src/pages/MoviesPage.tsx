import Filters from "@/components/Filters";
import Grid, { SkeletonGrid } from "@/components/Grid";
import MovieFilters from "@/components/MovieFilters";
import NotFound from "@/components/NotFound";
import SearchBar from "@/components/SearchBar";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Movie, type MovieParams, type MovieType } from "@/lib/Movie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const MoviesPage = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams({
    order: "ASC",
    order_by: "id",
  });

  //Converto da URL a oggetto di tipo MovieParams
  const params: MovieParams = Object.fromEntries(
    searchParams.entries()
  ) as MovieParams;

  useEffect(() => {
    setLoader(true);

    Movie.get(params).then((movies) => {
      setMovies(movies);
      setLoader(false);
    });
  }, [searchParams]);

  function searchMovie(value: string): void {
    //Mi prendo il valore precedente
    setSearchParams((prev) => {
      //Mi creo un nuovo oggetto usando i query string disponbili
      const next = new URLSearchParams(prev);

      //Controllo se value è vuoto o no
      if (value) {
        //Se ha valori, concateno alla query string il nuovo parametro con chiave 'name'
        next.set("title", value);
      } else {
        //Altrimenti, se vuoto, rimuovo il filtro name per mostrare tutti gli attori
        next.delete("title");
      }

      //Ritorno il nuovo oggetto
      return next;
    });
  }

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

  return (
    <main className="container">
      <h1 className="text-4xl font-semibold text-primary text-center lg:text-left">
        All movies
      </h1>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <p className="text-center lg:text-left">{movies.length} movies found</p>
        <Filters
          submit={'movieFilters'}
          clear={clearFilters}
          applied={
            Object.keys(params).filter(
              (elem) =>
                elem !== "name" && elem !== "order" && elem !== "order_by"
            ).length
          }
          form={<MovieFilters params={params} setParams={setSearchParams} />}
        />
        <NativeSelect onChange={(e: React.ChangeEvent<HTMLSelectElement>) => orderBy(e.currentTarget.value)} className="w-full lg:w-50">
          <NativeSelectOption value="">Select order</NativeSelectOption>
          <NativeSelectOption value="id:asc">Default order</NativeSelectOption>
          <NativeSelectOption value="title:asc">Ascending order</NativeSelectOption>
          <NativeSelectOption value="title:desc">Descending order</NativeSelectOption>
          <NativeSelectOption value="production_year:asc">Less places</NativeSelectOption>
          <NativeSelectOption value="production_year:desc">More places</NativeSelectOption>
        </NativeSelect>
        <SearchBar onChange={searchMovie} defaultValue={params.title} />
      </section>

      {/* Se la lista non viene ancora caricata, mostro lo skeleton come placeholder */}
      {loader && <SkeletonGrid iteration={8} />}

      {movies.length ? (
        <Grid list={movies} name="movies" />
      ) : (
        <NotFound text="No movies found" />
      )}
    </main>
  );
};

export default MoviesPage;
