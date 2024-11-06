"use client";

import { CustomButton } from "@/app/components/Button";
import usePostArticle from "@/app/hooks/article/usePostArticle";
import {
  Box,
  Button,
  TextInput,
  Textarea,
  FileInput,
  Stack,
  Space,
  rem,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { IconFileTypePdf } from "@tabler/icons-react";
import { dismissToast, errorToast, successToast } from "@/app/lib/toast";

interface IProps {
  userId: number;
}

interface IFormInput {
  title: string;
  content: string;
  pdfFile: File | null;
}

export default function ArticlePost({ userId }: IProps) {
  const icon = (
    <IconFileTypePdf style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const router = useRouter();

  const form = useForm<IFormInput>({
    mode: "controlled",
    initialValues: {
      title: "",
      content: "",
      pdfFile: null,
    },

    validate: {
      title: (value) =>
        value !== "" ? null : "Le titre ne peut pas être vide",
      content: (value) =>
        value !== "" ? null : "La description ne peut pas être vide",
      pdfFile: (value) =>
        value !== null && value.type === "application/pdf"
          ? null
          : "Le fichier doit être un PDF",
    },
  });

  const onSuccessCallback = () => {
    router.back();
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
      onSuccess(data) {
        dismissToast();
        successToast("Article soumis avec succès");
      },
      onSettled() {},
      onError(err) {
        //@ts-ignore
        err.response.data.map((error) => {
          errorToast(error.message);
        });
      },
    });
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <Box>
        <Stack>
          <TextInput
            classNames={{
              input: "focus:border-teal-500 focus:border-2 outline-none",
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
            label="Description"
            placeholder="Description de l'article"
            {...form.getInputProps("content")}
          />

          <FileInput
            classNames={{
              input:
                "border-2 border-red-200 focus:border-teal-500 focus:border-2 outline-none",

              root: "w-1/4 min-w-[100px]",
            }}
            leftSection={icon}
            variant="filled"
            clearable
            label="Joindre Article"
            placeholder="Joindre un article PDF"
            accept="application/pdf"
            {...form.getInputProps("pdfFile")}
          />
        </Stack>
        <Space h="xl" />
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <CustomButton
            color="red.4"
            fullWidth
            size="lg"
            radius="lg"
            onClick={() => form.reset()}
            disabled={!form.isDirty() || isPending}
          >
            Réinitialiser
          </CustomButton>

          <Space w="sm" />
          <CustomButton
            fullWidth
            size="lg"
            radius="lg"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader color="teal.4" type="bars" size="sm" />
            ) : (
              "Soumettre"
            )}
          </CustomButton>
        </Box>
      </Box>
    </form>
  );
}
