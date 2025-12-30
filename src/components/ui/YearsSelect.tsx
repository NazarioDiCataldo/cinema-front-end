import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { cn } from "@/lib/utils";

type YearsSelectProps = {
  years: string[],
  name: string,
  defaultValue: string | undefined,
  onSelect: (value: string, name: string) => void
};

const YearsSelect = ({ years, name, defaultValue, onSelect }: YearsSelectProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>(defaultValue ?? '');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between px-3"
        >
          {!value ? 'Search...' : value}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command className="shadow-xl">
          <CommandInput placeholder="Search year..." className="h-10 pl-3 caret-primary" />
          <CommandList>
            <CommandEmpty className="p-3">No year found.</CommandEmpty>
            <CommandGroup className="h-50 overflow-y-scroll">
              {years.map((year) => (
                <CommandItem
                  key={year}
                  value={`${year}`}
                  className="flex px-3 py-2"
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    onSelect(currentValue, name);
                    setOpen(false);
                  }}
                >
                  {year}
                  <Check
                    className={cn(
                      "ml-auto text-primary size-4",
                      value === year ? "opacity-100" : "opacity-0"
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
};

export default YearsSelect;
