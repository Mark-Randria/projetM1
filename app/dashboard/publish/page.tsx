import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Title, Paper, Space } from "@mantine/core";
import { getSession } from "@/app/lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken } from "@/app/types/type";
import ArticlePost from "./ArticlePost";

export default async function PublishArticle() {
  const session = await getSession();
  const decoded = jwt.decode(JSON.parse(session!)) as IToken;
  const userId = decoded.user.id;

  return (
    <Container className="pt-8">
     <Paper shadow="sm" radius="md" withBorder className="px-4 py-6">
        <Title order={2}>Publier un nouveau article {userId.toString()}</Title>
        <Space h="xl"/>
        <ArticlePost userId={userId}/>
     </Paper>
    </Container>
  );
}
