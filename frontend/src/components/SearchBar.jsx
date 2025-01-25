import { useState } from "react";
import { Input, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "../components/ui/input-group";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <InputGroup
      flex="1"
      endElement={
        <>
          {query && (
            <IconButton
              colorPalette="red"
              background={"transparent"}
              onClick={handleSearch}
              rounded={"full"}
            >
              <BiSearch />
            </IconButton>
          )}
        </>
      }
    >
      <Input
        placeholder="Search products..."
        variant="flushed"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        // pr="4.5rem" // Add padding to prevent text from overlapping the icon

      />
    </InputGroup>
  );
}
