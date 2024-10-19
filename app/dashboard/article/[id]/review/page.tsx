import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container } from "@mantine/core";

interface IProps {
  params: { id: number };
}
// reviewer to provide critics
export default function ReviewTheArticle({ params: { id } }: IProps) {
  return (
    <Container>
      <Box>article Id {id} to review</Box>
    </Container>
  );
}
