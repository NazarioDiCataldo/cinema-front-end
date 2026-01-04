import { Hall, type HallParams } from "@/lib/Hall";
import { useEffect, useState, type FormEvent } from "react";
import type { SetURLSearchParams } from "react-router";
import YearsSelect from "./ui/YearsSelect";
import { CitySelect } from "./ui/CitySelect";

type HallFiltersProps = {
  params: HallParams;
  setParams: SetURLSearchParams;
};

const HallFilters = ({ params, setParams }: HallFiltersProps) => {
  const [data, setData] = useState<HallParams>({});
  const [placesList, setPlacesList] = useState<string[]>([]);

  useEffect(() => {

    Hall.rangePlaces().then(({min, max}) => {
      const places = [];

      //Creo un array con tutte le date, dalla minima a quella di odierna
      for(let i = min; i <= max; i++) {
        places.push(i.toString())
      }

      setPlacesList(places);
    })


  }, [])

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
    <form onSubmit={applyFilters} id="hallFilters" className="flex flex-col gap-4">
      {/* Città */}
      <div className="flex flex-col gap-2">
        <label id="city" className="font-medium">City</label>
        <CitySelect
          id='city'
          name="city"
          onSelect={addParam}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label id="genre" className="font-medium">Production year</label>
        <div className="flex flex-col lg:items-center md:flex-row w-full gap-4">
          {/* Da */}
          <YearsSelect
            years={placesList}
            defaultValue={params["places_from"]?.toString()}
            name="places_from"
            onSelect={addParam}
          />
          to
          {/* A */}
          <YearsSelect
            years={[...placesList].reverse()}
            defaultValue={params["places_to"]?.toString()}
            name={"places_to"}
            onSelect={addParam}
          />
        </div>
      </div>
    </form>
  );
};

export default HallFilters;
