import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const countries = [
  {
    value: "italia",
    label: "Italy",
  },
  {
    value: "spagna",
    label: "Spain",
  },
  {
    value: "stati uniti",
    label: "USA",
  },
  {
    value: "canada",
    label: "Canada",
  },
  {
    value: "regno unito",
    label: "United Kingdom",
  },
  {
    value: "australia",
    label: "Australia",
  },
  {
    value: "sudafrica",
    label: "South Africa",
  },
  {
    value: "irlanda",
    label: "Ireland",
  },
  {
    value: "nuova zelanda",
    label: "New Zealand",
  },
  {
    value: "messico",
    label: "Mexico",
  },
]

type NationaltySelectProps = {
  name: string,
  defaultValue?: string,
  onSelect: (value: string, name: string) => void
};

export function NationalitySelect({name, defaultValue, onSelect}: NationaltySelectProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>(defaultValue ?? '')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className='w-full'>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : "Select country..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="Search country..." className="h-10" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect(currentValue, name);
                    setOpen(false);
                  }}
                >
                  {country.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
