import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Space, Title } from "@mantine/core";
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
    <div className="min-h-screen px-4 pt-6">
      <div className="ml-2 ">
        <Title order={2}>Details de l'article</Title>
      </div>
      <Space h="md" />
      <ArticleBox userId={decoded.user.id} articleId={id} />
    </div>
  );
}
