import { Actor, type ActorParams } from "@/lib/Actor";
import YearsSelect from "./ui/YearsSelect";
import { useEffect, useState, type FormEvent } from "react";
import type { SetURLSearchParams } from "react-router";
import { FilterSelect } from "./ui/FilterSelect";

type ActorFiltersProps = {
  params: ActorParams;
  setParams: SetURLSearchParams;
};

const ActorFilters = ({ params, setParams }: ActorFiltersProps) => {
  const [data, setData] = useState<ActorParams>({});
  const [yearsList, setYearsList] = useState<string[]>([]);

  useEffect(() => {
    Actor.rangeYear()
      .then(({ min, max }) => {
        const years = [];

        //Creo un array con tutte le date, dalla minima a quella di odierna
        for (let i = min; i <= max; i++) {
          years.push(i.toString());
        }

        setYearsList(years);
      })
      .catch((err) => console.error(err));
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
      className="flex flex-col gap-6 items-start"
      onSubmit={applyFilters}
      id="actorsFilters"
    >
      <div className="w-full flex flex-col gap-2">
        <label id="genre" className="font-medium">
          Birth year
        </label>
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Da */}
          <YearsSelect
            years={yearsList}
            defaultValue={params["birth_year_from"]?.toString()}
            name="birth_year_from"
            onSelect={addParam}
          />
          {/* A */}
          <YearsSelect
            years={[...yearsList].reverse()}
            defaultValue={params["birth_year_to"]?.toString()}
            name={"birth_year_to"}
            onSelect={addParam}
          />
        </div>
      </div>
      {/* Nazionalità */}
      <div className="w-full flex flex-col gap-2">
        <label id="nationality" className="font-medium">
          Nationality
        </label>
        <FilterSelect
          filter={{
            selector: "actors",
            name: "nationality",
          }}
          defaultValue={params["nationality"]}
          onSelect={addParam}
        />
      </div>
    </form>
  );
};

export default ActorFilters;
