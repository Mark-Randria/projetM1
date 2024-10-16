'use client'
import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container } from "@mantine/core";
import { CustomButton } from "./components/Button";

export default function Home() {

  const afficherAlerte = () => {
    alert('Coucou');
  };

  return (
    <Container size="sm">
      <Box
        style={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <h1>
          De aona ral...deadline am 26 octobre 2024
        </h1>
        <p>Minana tsika raha midororo</p>
        <Button className="btn-link" component={Link} href="/items/lists">Lien</Button>
        <CustomButton onClick={afficherAlerte} text="coucou"/>
      </Box>
    </Container>
  );
}
