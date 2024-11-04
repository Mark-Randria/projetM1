"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Button, Box, Select } from "@mantine/core";
import useDeleteArticle from "../hooks/adminArticleAction/useDeleteArticle";
import useUpdateArticle from "../hooks/adminArticleAction/useUpdateArticle";

interface IArticleActionsProps {
  articleId: number;
  status: string;
}

export default function ArticleActions({
  articleId,
  status,
}: IArticleActionsProps) {
  const [articleStatus, setArticleStatus] = useState<any>(status);

  const selectData = ["APPROVED", "REJECTED"];

  const onSuccessCallback = () => {};

  const { mutate: deleteArticle, isPending: deleteIsPending } =
    useDeleteArticle(() => onSuccessCallback());

  const { mutate: updateArticle, isPending: updateIsPending } =
    useUpdateArticle(() => onSuccessCallback());

  const handleUpdateArticle = () => {
    updateArticle(
      {
        articleId: articleId.toString(),
        data: {
          status: articleStatus,
        },
      },
      {
        onSuccess(data) {},
        onSettled() {},
        onError() {},
      }
    );
  };

  const handleDeleteArticle = () => {
    deleteArticle(
      {
        articleId: articleId.toString(),
      },
      {
        onSuccess(data) {},
        onSettled() {},
        onError() {},
      }
    );
  };

  return (
    <>
      <Box>
        <Select
          maw="fit-content"
          label="Status"
          placeholder="PENDING"
          data={selectData}
          value={articleStatus}
          onChange={setArticleStatus}
        />
      </Box>
      <Button onClick={handleUpdateArticle} disabled={updateIsPending}>
        Confirm
      </Button>
      <Button onClick={handleDeleteArticle} disabled={deleteIsPending}>
        Delete Article
      </Button>
    </>
  );
}
