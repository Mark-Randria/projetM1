"use client";

import usePostArticle from "@/app/hooks/article/usePostArticle";
import { Box, Button, TextInput, Textarea, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IProps {
  userId: number;
}

interface IFormInput {
  title: string;
  content: string;
  pdfFile: File | null;
}

export default function ArticlePost({ userId }: IProps) {
  const form = useForm<IFormInput>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
      pdfFile: null,
    },

    validate: {
      title: (value) => (value !== "" ? null : "Empty title"),
      content: (value) => (value !== "" ? null : "Empty content"),
      pdfFile: (value) =>
        value !== null && value.type === "application/pdf"
          ? null
          : "File must be a PDF",
    },
  });

  const onSuccessCallback = () => {};

  const {
    mutate: postArticle,
    isPending,
    isError,
  } = usePostArticle(() => onSuccessCallback());

  const handleSubmit = (values: any) => {
    const { title, content, pdfFile } = values;

    const formData = new FormData();
    formData.append("titreArticle", title);
    formData.append("contenu", content);
    formData.append("auteurId", userId.toString());
    formData.append("pdfFile", pdfFile);

    postArticle(formData, {
      onSuccess(data) {},
      onSettled() {},
      onError() {},
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Box>
        Da components {userId.toString()}
        <TextInput
          classNames={{
            label: "bg-red-100",
          }}
          withAsterisk
          label="titre"
          placeholder="titre de l'article"
          {...form.getInputProps("title")}
        />
        <Textarea
          variant="filled"
          label="Contenu"
          description="Input description"
          placeholder="Input placeholder"
          {...form.getInputProps("content")}
        />
        <FileInput
          clearable
          label="Upload files"
          placeholder="Upload files"
          accept="application/pdf"
          {...form.getInputProps("pdfFile")}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Soumettre"}
        </Button>
      </Box>
    </form>
  );
}
