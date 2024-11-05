"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Box, Select, ActionIcon, Button } from "@mantine/core";
import useDeleteArticle from "../hooks/adminArticleAction/useDeleteArticle";
import useUpdateArticle from "../hooks/adminArticleAction/useUpdateArticle";
import { FileIcon } from "@/constants/icon";
import { CustomButton } from "../components/Button";

interface IArticleActionsProps {
  articleId: number;
  status: string;
  selectDisabled?: boolean;
}

export default function ArticleActions({
  articleId,
  status,
  selectDisabled,
}: IArticleActionsProps) {
  const router = useRouter();

  const [articleStatus, setArticleStatus] = useState<any>(status);

  const selectData = ["APPROVED", "REJECTED"];

  const onSuccessCallback = () => {
    router.push("/dashboard");
  };

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
    <div className="flex flex-col items-center justify-between">
      {selectDisabled ? null : (
        <Select
          classNames={{
            input:
              "rounded-md  focus:border-teal-500 focus:border-2 outline-none",
            wrapper: "w-full",
            root: "w-full",
          }}
          maw="fit-content"
          placeholder="PENDING"
          data={selectData}
          value={articleStatus}
          onChange={setArticleStatus}
        />
      )}
      <div className="flex flex-row items-center gap-2">
        {selectDisabled ? null : (
          <CustomButton
            onClick={handleUpdateArticle}
            disabled={updateIsPending}
          >
            Confirmer
          </CustomButton>
        )}
        <Button
          color="red.4"
          onClick={handleDeleteArticle}
          disabled={deleteIsPending}
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
}
