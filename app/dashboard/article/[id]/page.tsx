"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container } from "@mantine/core";

interface IProps {
  params: { id: number };
}

export default function MyArticle({ params: { id } }: IProps) {
  return (
    <Container>
      <Box>article Id {id}</Box>
    </Container>
  );
}
