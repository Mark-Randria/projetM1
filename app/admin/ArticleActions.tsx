"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Box } from "@mantine/core";

interface IArticleActionsProps {
  articleId: number;
}

export default function ArticleActions({ articleId }: IArticleActionsProps) {
  return <>Article Action {articleId.toString()}</>;
}
