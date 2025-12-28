import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import debounce from "lodash.debounce";
import { SearchIcon } from "lucide-react";

type SearchBarProps = {
  onChange: (value: string) => void;
};

const SearchBar = ({ onChange }: SearchBarProps) => {

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Search actor..."
        onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), 400)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
