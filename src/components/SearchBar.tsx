import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import debounce from "lodash.debounce";
import { SearchIcon} from "lucide-react";
import { useState } from "react";

type SearchBarProps = {
  onChange: (value: string) => void;
  defaultValue?: string;
};

const SearchBar = ({ onChange, defaultValue }: SearchBarProps) => {
  const [value, setValue] = useState<string>(defaultValue ?? '');

  return (
    <InputGroup className="bg-white">
      <InputGroupInput
        placeholder = 'Search ...'
        value= {value}
        onChange={(e) => {
          setValue(e.target.value);
          debounce(onChange(e.target.value), 400)
        }}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
        
    </InputGroup>
  );
};

export default SearchBar;
