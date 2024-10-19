import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container } from "@mantine/core";

interface IProps {
  params: { id: number };
}
// edit the article for the author
export default function EditMyArticle({ params: { id } }: IProps) {
  return (
    <Container>
      <Box>EDIT article Id {id}</Box>
    </Container>
  );
}
