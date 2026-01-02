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

type GenreSelectProps = {
  id: string;
  name: string;
  defaultValue?: string;
  onSelect: (value: string, name: string) => void;
};

type genre = {
  genre: string;
};

export function GenreSelect({
  id,
  name,
  defaultValue,
  onSelect,
}: GenreSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(defaultValue ?? "");
  const [genres, setGenres] = React.useState<genre[]>([]);

  useEffect(() => {
    Movie.genres().then((dir) => setGenres(dir));
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
          {value ? value : "Select genre..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search genre..." className="h-10" />
          <CommandList>
            <CommandEmpty>No genre found.</CommandEmpty>
            <CommandGroup>
              {genres.map((genre) => (
                <CommandItem
                  key={genre.genre}
                  value={genre.genre}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect(currentValue, name);
                    setOpen(false);
                  }}
                >
                  {genre.genre}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === genre.genre
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
