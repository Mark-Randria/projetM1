import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container } from "@mantine/core";
import { getSession } from "@/app/lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken } from "@/app/types/type";
import ArticlePost from "./ArticlePost";

export default async function PublishArticle() {
  const session = await getSession();
  const decoded = jwt.decode(JSON.parse(session!)) as IToken;
  const userId = decoded.user.id;

  return (
    <Container>
      <Box>Publish a new article for user {userId.toString()}</Box>
      <ArticlePost userId={userId}/>
    </Container>
  );
}
