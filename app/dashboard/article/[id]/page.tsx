import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container } from "@mantine/core";
import { getSession } from "@/app/lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken } from "@/app/types/type";
import ArticleBox from "./ArticleBox";

interface IProps {
  params: { id: number };
}

export default async function MyArticle({ params: { id } }: IProps) {
  const session = await getSession();
  const decoded = jwt.decode(JSON.parse(session!)) as IToken;

  return (
    <Container>
      <Box>article Id {id}</Box>
      <ArticleBox userId={decoded.user.id} articleId={id} />
    </Container>
  );
}
