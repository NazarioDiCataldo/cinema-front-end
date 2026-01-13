import { Movie, type MovieParams } from "@/lib/Movie";
import { useEffect, useState, type FormEvent } from "react";
import type { SetURLSearchParams } from "react-router";
import YearsSelect from "./ui/YearsSelect";
import { FilterSelect } from "./ui/FilterSelect";

type MovieFiltersProps = {
  params: MovieParams;
  setParams: SetURLSearchParams;
};

const MovieFilters = ({ params, setParams }: MovieFiltersProps) => {
  const [data, setData] = useState<MovieParams>({});
  const [yearsList, setYearsList] = useState<string[]>([]);

  useEffect(() => {
    Movie.rangeYear().then(({ min, max }) => {
      const years = [];

      //Creo un array con tutte le date, dalla minima a quella di odierna
      for (let i = min; i <= max; i++) {
        years.push(i.toString());
      }

      setYearsList(years);
    });
  }, []);

  function addParam(value: string | number, name: string): void {
    setData({
      ...data,
      [name]: value,
    });
  }

  function applyFilters(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    setParams((prev) => {
      //Mi creo un nuovo oggetto usando i query string disponbili
      const next = new URLSearchParams(prev);

      //Itero sull'array di dati
      for (const [key, value] of Object.entries(data)) {
        //Controllo se value è vuoto o no
        if (value) {
          //Se ha valori, concateno alla query string il nuovo parametro con chiave 'name'
          next.set(key, value.toString());
        } else {
          //Altrimenti, se vuoto, rimuovo il filtro name per mostrare tutti gli attori
          next.delete(key);
        }
      }

      //Ritorno il nuovo oggetto
      return next;
    });
  }

  return (
    <form
      onSubmit={applyFilters}
      id="movieFilters"
      className="flex flex-col gap-4"
    >
      {/* Nazionalità */}
      <div className="flex flex-col gap-2">
        <label id="nationality" className="font-medium">
          Nationality
        </label>
        <FilterSelect
          filter={{
            selector: 'movies',
            name: "nationality"
          }}
          defaultValue={params["nationality"]}
          onSelect={addParam}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label id="director" className="font-medium">
          Director
        </label>
        <FilterSelect
          filter={{
            selector: "movies",
            name: 'director'
          }}
          defaultValue={params["nationality"]}
          onSelect={addParam}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label id="genre" className="font-medium">
          Genre
        </label>
        <FilterSelect
          filter={{
            selector: "movies",
            name: 'genre'
          }}
          defaultValue={params["nationality"]}
          onSelect={addParam}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label id="genre" className="font-medium">
          Production year
        </label>
        <div className="flex flex-col lg:items-center md:flex-row w-full gap-4">
          {/* Da */}
          <YearsSelect
            years={yearsList}
            defaultValue={params["production_year_from"]?.toString()}
            name="production_year_from"
            onSelect={addParam}
          />
          to
          {/* A */}
          <YearsSelect
            years={[...yearsList].reverse()}
            defaultValue={params["production_year_to"]?.toString()}
            name={"production_year_to"}
            onSelect={addParam}
          />
        </div>
      </div>
    </form>
  );
};

export default MovieFilters;
