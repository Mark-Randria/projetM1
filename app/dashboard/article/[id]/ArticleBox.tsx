"use client";

import useGetOneArticle from "@/app/hooks/article/useGetOneArticle";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Button,
  LoadingOverlay,
  Modal,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import Link from "next/link";
import usePostCritique from "@/app/hooks/critique/usePostCritique";
import { useForm } from "@mantine/form";
import useDeleteCritique from "@/app/hooks/critique/useDeleteCritique";

interface IProps {
  userId: number;
  articleId: number;
}

interface IFormInput {
  titreCritique: string;
  descriptionCritique: string;
}

export default function ArticleBox({ userId, articleId }: IProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<IFormInput>({
    mode: "uncontrolled",
    initialValues: {
      titreCritique: "",
      descriptionCritique: "",
    },

    validate: {
      titreCritique: (value) =>
        value.length > 0 ? null : "le titre ne doit pas etre vide",
      descriptionCritique: (value) =>
        value.length > 0 ? null : "la description ne doit pas etre vide",
    },
  });

  const {
    data: article,
    isLoading,
    isError,
  } = useGetOneArticle(userId.toString(), articleId.toString());

  const onSuccessCallback = () => {};

  const { mutate: postCritique, isPending: isPostingPending } = usePostCritique(
    () => onSuccessCallback()
  );

  const { mutate: deleteCritique, isPending: isDeletePending } =
    useDeleteCritique(() => onSuccessCallback());

  const handlePostCritique = (values: IFormInput) => {
    const { titreCritique, descriptionCritique } = values;
    postCritique(
      {
        titreCritique,
        descriptionCritique,
        reviewerId: Number(userId),
        articleId: Number(articleId),
      },
      {
        onSuccess(data) {
          console.log(data);
        },
        onSettled() {},
        onError() {},
      }
    );
  };

  const handleDeleteCritique = (critiqueId: string) => {
    deleteCritique(
      {
        critiqueId: critiqueId,
      },
      {
        onSuccess(data) {},
        onSettled() {},
        onError(err) {},
      }
    );
  };

  const message = userId === article?.auteurId ? "Author" : "Reviewer";

  if (isLoading)
    return (
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );

  if (isError) return <>Une erreur s&apos;est produite</>;
  return (
    <>
      Hallo {message} of Article
      <Box
        key={article!.id}
        mb="20"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Text size="lg">Title : {article?.titreArticle}</Text>
          <p>{article!.titreArticle}</p>
          <p>{article!.contenu}</p>
          <p>{article!.archive}</p>
          {article!.pdfPath ? (
            <Link href={`${article!.pdfPath}`}>See file</Link>
          ) : (
            <>No File attached</>
          )}
          <p>
            posté le {new Date(article!.datePubArticle).toLocaleString("fr")}
          </p>
        </Box>
        <Box>
          <Modal opened={opened} onClose={close} title="Supprimer">
            Voulez-vous vraiment supprimer ?
          </Modal>
          {message === "Author" ? (
            <>
              <Button onClick={open} color="red">
                Effacer
              </Button>
            </>
          ) : null}
        </Box>
      </Box>
      <form
        className="bg-red-100"
        hidden={message === "Author"}
        onSubmit={form.onSubmit((values) => handlePostCritique(values))}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          Poster critique
          <TextInput
            classNames={{
              label: "bg-red-100",
            }}
            withAsterisk
            label="Titre du critique"
            placeholder="titre du critique"
            {...form.getInputProps("titreCritique")}
          />
          <Textarea
            variant="filled"
            label="Contenu du critique"
            description="Input description"
            placeholder="Input placeholder"
            {...form.getInputProps("descriptionCritique")}
          />
          <Button type="submit" disabled={isPostingPending}>
            Poster
          </Button>
        </Box>
      </form>
      <Box>
        <Text size="lg" mb={10}>
          Liste des critiques
        </Text>
        {article!.critiques.length > 0 ? (
          article!.critiques.map((critique) => (
            <Box key={critique.id} mb="20">
              <p>{critique.titreCritique}</p>
              <p>{critique.descriptionCritique}</p>
              <p>
                {critique.reviewer.id === userId ? (
                  <Button
                    disabled={isDeletePending}
                    onClick={() => handleDeleteCritique(critique.id.toString())}
                  >
                    Delete
                  </Button>
                ) : (
                  <Button disabled>Cannot delete</Button>
                )}
              </p>
              <p>
                posté le{" "}
                {new Date(critique.datePubCritique).toLocaleString("fr")}
              </p>
              <p>par {critique.reviewer.nom}</p>
            </Box>
          ))
        ) : (
          <Box>No critique at the moment</Box>
        )}
      </Box>
    </>
  );
}
