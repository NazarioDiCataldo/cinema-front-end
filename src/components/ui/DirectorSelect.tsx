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
import { Movie } from "@/lib/Movie";

type DirectorSelectProps = {
  id: string;
  name: string;
  defaultValue?: string;
  onSelect: (value: string, name: string) => void;
};

type director = {
  director: string;
};

export function DirectorSelect({
  id,
  name,
  defaultValue,
  onSelect,
}: DirectorSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(defaultValue ?? "");
  const [directors, setDirectors] = React.useState<director[]>([]);

  useEffect(() => {
    Movie.directors().then((dir) => setDirectors(dir));
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
          {value ? value : "Select director..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search director..." className="h-10" />
          <CommandList>
            <CommandEmpty>No director found.</CommandEmpty>
            <CommandGroup>
              {directors.map((director) => (
                <CommandItem
                  key={director.director}
                  value={director.director}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect(currentValue, name);
                    setOpen(false);
                  }}
                >
                  {director.director}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === director.director
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
