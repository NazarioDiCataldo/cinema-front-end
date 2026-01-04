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
import { Hall } from "@/lib/Hall";

type CitySelectProps = {
  id: string;
  name: string;
  defaultValue?: string;
  onSelect: (value: string, name: string) => void;
};

type City = {
  city: string;
};

export function CitySelect({
  id,
  name,
  defaultValue,
  onSelect,
}: CitySelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(defaultValue ?? "");
  const [cities, setCities] = React.useState<City[]>([]);

  useEffect(() => {
    Hall.cities().then((cities) => setCities(cities));
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Select city..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search City..." className="h-10" />
          <CommandList>
            <CommandEmpty>No City found.</CommandEmpty>
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.city}
                  value={city.city}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect(currentValue, name);
                    setOpen(false);
                  }}
                >
                  {city.city}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === city.city
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
