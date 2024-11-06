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
  archived?: boolean;
  selectDisabled?: boolean;
}

export default function ArticleActions({
  articleId,
  status,
  archived,
  selectDisabled,
}: IArticleActionsProps) {
  const router = useRouter();

  const [articleStatus, setArticleStatus] = useState<string | null>(status);

  enum Status {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
  }

  const statusMapping = {
    APPROVED: "Approuvé",
    REJECTED: "Rejeté",
  };

  const selectData = [
    { value: "APPROVED", label: statusMapping["APPROVED"] },
    { value: "REJECTED", label: statusMapping["REJECTED"] },
  ];

  const onSuccessCallback = () => {
    router.refresh();
    setArticleStatus(null);
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
          status: articleStatus as Status,
        },
      },
      {
        onSuccess(data) {},
        onSettled() {},
        onError() {},
      }
    );
  };

  const handleArchiveArticle = () => {
    updateArticle(
      {
        articleId: articleId.toString(),
        data: {
          archive: true,
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
          placeholder="En Attente"
          data={selectData}
          value={articleStatus}
          onChange={(value) => setArticleStatus(value)}
        />
      )}
      <div className="flex flex-row items-center gap-2">
        {selectDisabled ? (
          <CustomButton
            onClick={handleArchiveArticle}
            disabled={updateIsPending || archived}
          >
            {archived ? "Déja Archivé" : "Archiver"}
          </CustomButton>
        ) : (
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
