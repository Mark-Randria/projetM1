"use client";

import { CustomButton } from "@/app/components/Button";
import usePostArticle from "@/app/hooks/article/usePostArticle";
import { FileIcon } from "@/constants/icon";
import { Box, Button, TextInput, Textarea, FileInput, Stack, Space } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

interface IProps {
  userId: number;
}

interface IFormInput {
  title: string;
  content: string;
  pdfFile: File | null;
}

export default function ArticlePost({ userId }: IProps) {
  const router = useRouter();
  
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

  const onSuccessCallback = () => {
    router.replace('/dashboard');
  };

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
        <Stack>
        <TextInput
         classNames={{
          input: " focus:border-teal-500 focus:border-2 outline-none",
          root: "w-full",
        }}
          withAsterisk
          label="Titre de l'article"
          placeholder="Titre de l'article"
          {...form.getInputProps("title")}
        />
        <Textarea
           classNames={{
            input: " focus:border-teal-500 focus:border-2 outline-none",
            root: "w-full",
          }}
         
          label="Despription"
          placeholder="Description de l'article"
          {...form.getInputProps("content")}
        />
       
          <FileInput
             classNames={{
              input: " border-2 border-red-200 focus:border-teal-500 focus:border-2 outline-none",
             
              root: "w-1/4",
            }}
            // leftSection={<FileIcon/>}
            variant="filled"
            clearable
            label="Joindre Article"
            placeholder="Joindre un article PDF"
            accept="application/pdf"
            {...form.getInputProps("pdfFile")}
          />
      
        </Stack>
        <Space h="xl"/>
       <Box  style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems:"center",
        }}>
        <CustomButton fullWidth size="lg" radius="lg" type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Soumettre"}
        </CustomButton>
       </Box>
      </Box>
    </form>
  );
}
