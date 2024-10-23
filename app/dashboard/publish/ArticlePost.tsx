"use client";

import usePostArticle from "@/app/hooks/article/usePostArticle";
import { Box, Button, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

interface IProps {
  userId: number;
}

interface IFormInput {
  title: string;
  content: string;
}

export default function ArticlePost({ userId }: IProps) {
  const form = useForm<IFormInput>({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
    },

    validate: {
      title: (value) => (value !== "" ? null : "Empty title"),
      content: (value) => (value !== "" ? null : "Empty content"),
    },
  });

  const onSuccessCallback = () => {};

  const {
    mutate: postArticle,
    isPending,
    isError,
  } = usePostArticle(() => onSuccessCallback());

  const handleSubmit = (values: any) => {
    const { title, content } = values;
    postArticle(
      {
        titreArticle: title,
        contenu: content,
        auteurId: userId,
      },
      {
        onSuccess(data) {},
        onSettled() {},
        onError() {},
      }
    );
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Soumettre"}
        </Button>
      </Box>
    </form>
  );
}
