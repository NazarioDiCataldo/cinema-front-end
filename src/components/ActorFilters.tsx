import type { ActorParams } from "@/lib/Actor";
import YearsSelect from "./ui/YearsSelect";
import { useState, type FormEvent } from "react";
import { NationalitySelect } from "./ui/NationalitySelect";
import type { SetURLSearchParams } from "react-router";

type ActorFiltersProps = {
  params: ActorParams;
  setParams: SetURLSearchParams;
};

const ActorFilters = ({ params, setParams }: ActorFiltersProps) => {
  const [data, setData] = useState<ActorParams>({});

  const yearsList = Array.from(
    { length: 125 },
    (_, i) => new Date().getFullYear() - i
  ).map((elem) => elem.toString());

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
          years={yearsList.reverse()}
          defaultValue={params["birth_year_to"]?.toString()}
          name={"birth_year_to"}
          onSelect={addParam}
        />
      </div>
      {/* Nazionalità */}
      <NationalitySelect
        name={"nationality"}
        defaultValue={params["nationality"]}
        onSelect={addParam}
      />
    </form>
  );
};

export default ActorFilters;
