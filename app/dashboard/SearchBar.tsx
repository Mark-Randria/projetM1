"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Box, Space, MultiSelect } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm) {
      const params = searchTerm
        .map((term) => `search=${encodeURIComponent(term)}`)
        .join("&");
      router.push(`/dashboard?${params}`);
    } else {
      router.push("/dashboard");
    }
  };
  console.log(searchTerm);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      className="gap-x-2"
    >
      <MultiSelect
        placeholder="Filtrer mon article"
        data={["PENDING", "REJECTED", "APPROVED", "Refusé"]}
        searchable
        nothingFoundMessage="Aucun Trouvé..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <Button onClick={handleSearch}>
        <IconSearch />
      </Button>
    </Box>
  );
}
