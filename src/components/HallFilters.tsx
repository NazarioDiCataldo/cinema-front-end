import { Hall, type HallParams } from "@/lib/Hall";
import { useEffect, useState, type FormEvent } from "react";
import type { SetURLSearchParams } from "react-router";
import { Field, FieldDescription, FieldTitle } from "./ui/field";
import { Slider } from "./ui/slider";
import { FilterSelect } from "./ui/FilterSelect";

type HallFiltersProps = {
  params: HallParams;
  setParams: SetURLSearchParams;
};

type Range = {
  min: number;
  max: number;
};

const HallFilters = ({ params, setParams }: HallFiltersProps) => {
  const [data, setData] = useState<HallParams>({});
  const [range, setRange] = useState<Range>();
  const [value, setValue] = useState<number[]>([]);

  useEffect(() => {
    Hall.rangePlaces().then(({ min, max }) => {
      //Imposto il range tramite il valore minimo e massimo
      setRange({ max, min });
      //Anche i valori dell'input, se sono definiti imposto quelli, altrimenti quelli massimi e minimi
      setValue([params.places_from ?? min, params.places_to ?? max]);
    });
  }, []);

  function addParam(value: string | number[], name: string | string[]): void {
    //Verifico prima se il i valori e il nome sono degli array
    if (Array.isArray(value) && Array.isArray(name)) {
      let obj = {};
      //itero sull'array e creo un oggetto che viene passato al setState in un'unica soluzione
      for (let i = 0; i < value.length; i++) {
        obj = {
          ...obj,
          [name[i]]: value[i],
        };
      }

      setData({
        ...data,
        ...obj,
      });
    } else {
      setData({
        ...data,
        [name.toString()]: value,
      });
    }
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
      id="hallFilters"
      className="flex flex-col gap-4"
    >
      {/* Città */}
      <div className="flex flex-col gap-2">
        <label id="city" className="font-medium">
          City
        </label>
        <FilterSelect
          filter={{
            selector: "halls",
            name: "city",
          }}
          defaultValue={params["city"]}
          onSelect={addParam}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col lg:items-center md:flex-row w-full gap-4">
          <Field>
            <FieldTitle className="font-medium text-md">
              Places range
            </FieldTitle>
            <FieldDescription>
              (<span className="font-medium tabular-nums">{value[0]}</span> -{" "}
              <span className="font-medium tabular-nums">{value[1]}</span>)
            </FieldDescription>
            <Slider
              value={value}
              onValueChange={(val) => {
                setValue(val);
                addParam(val, ["places_from", "places_to"]);
              }}
              max={range?.max}
              min={range?.min}
              step={1}
              className="mt-2 w-full"
              aria-label="Places Range"
            />
          </Field>
        </div>
      </div>
    </form>
  );
};

export default HallFilters;
