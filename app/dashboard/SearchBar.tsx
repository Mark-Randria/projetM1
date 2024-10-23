"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Box } from "@mantine/core";

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
    <Box style={{
      display: 'flex',
      flexDirection: 'row',
      gap: 20
    }}>
      <TextInput
        placeholder="Search articles"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </Box>
  );
}
