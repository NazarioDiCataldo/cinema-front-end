import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { Actor } from "@/lib/Actor";
import { Movie } from "@/lib/Movie";
import { Hall } from "@/lib/Hall";

//tipo per il props del componente
type FilterSelectProps = {
  filter: FilterConfig;
  defaultValue?: string;
  onSelect: (value: string, name: string) => void;
};

type FilterConfig =
  | { selector: "actors"; name: "nationality"}
  | { selector: "movies"; name: "director" | "genre" | "nationality"}
  | { selector: "halls"; name: "city"};

export function FilterSelect({
  filter,
  defaultValue,
  onSelect,
}: FilterSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | undefined>(
    defaultValue ?? undefined
  );
  const [data, setData] = React.useState<{[key:string]: string}[]>([]);
  const { name, selector } = filter;

  useEffect(() => {
    switch (selector) {
      case "actors":
        switch (name) {
          case "nationality":
            Actor.nationalities()
              .then((nat) => {setData(nat)})
              .catch((err) => console.error(err));
            break;
        }
        break;
      case "movies":
        switch (name) {
          case "director":
            Movie.directors()
              .then((dir) => setData(dir))
              .catch((err) => console.error(err));
            break;
          case "nationality":
            Movie.nationalities()
              .then((nat) => setData(nat))
              .catch((err) => console.error(err));
            break;
          case "genre":
            Movie.genres()
              .then((gen) => setData(gen))
              .catch((err) => console.error(err));
            break;
        }
        break;
      case "halls":
        switch (name) {
          case "city":
            Hall.cities()
              .then((cit) => setData(cit))
              .catch((err) => console.error(err));
        }
        break;
    }
  }, [name, selector]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <Button
          id={String(name)}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ?? `Select ${String(name)}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${String(name)}...`}
            className="h-10"
          />
          <CommandList>
            <CommandEmpty>{`No ${String(name)} found.`}</CommandEmpty>
            <CommandGroup>
              {data.map((elem) => {
                const filterSelection = elem[name];
                return (
                  <CommandItem
                    key={filterSelection}
                    value={filterSelection}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      onSelect(currentValue, String(name));
                      setOpen(false);
                    }}
                  >
                    {filterSelection}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === filterSelection ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
