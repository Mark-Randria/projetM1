"use client";

import useGetOneArticle from "@/app/hooks/article/useGetOneArticle";
import { Box, LoadingOverlay, Text } from "@mantine/core";
import Link from "next/link";

interface IProps {
  userId: number;
  articleId: number;
}

export default function ArticleBox({ userId, articleId }: IProps) {
  const { data: article, isLoading } = useGetOneArticle(
    userId.toString(),
    articleId.toString()
  );

  const message = userId === article?.auteurId ? "Author" : "Reviewer";

  if (article === undefined) return <p>Article not found</p>;

  if (isLoading)
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  return (
    <>
      Hallo {message} of Article
      <Box key={article.id} mb="20">
        <Text size="lg">Title : {article?.titreArticle}</Text>
        <p>{article.titreArticle}</p>
        <p>{article.contenu}</p>
        <p>{article.archive}</p>
        <p>posté le {new Date(article.datePubArticle).toLocaleString("fr")}</p>
      </Box>
    </>
  );
}
