import { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
    setQuery("");
  };

  return (
    <HStack spacing={4}>
      <Input
        placeholder="Search products..."
        value={query}
        type="search"
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && <Button onClick={handleSearch}>Search</Button>}
    </HStack>
  );
}
