"use client";

import useGetOneArticle from "@/app/hooks/article/useGetOneArticle";
import { LoadingOverlay } from "@mantine/core";

interface IProps {
  userId: number;
  articleId: number;
}

export default function ArticleBox({ userId, articleId }: IProps) {
  const { data: article, isLoading } = useGetOneArticle(
    userId.toString(),
    articleId.toString()
  );

  if (isLoading)
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  return <>Hallo {userId.toString()}</>;
}
