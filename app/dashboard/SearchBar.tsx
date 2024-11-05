"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Box, Space } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/dashboard?title=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
      }}
      className="gap-x-2"
    >
      <TextInput
        placeholder="Rechercher mon article"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>
        <IconSearch />
      </Button>
    </Box>
  );
}
