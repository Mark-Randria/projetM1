"use client";

import useGetOneArticle from "@/app/hooks/article/useGetOneArticle";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Button,
  LoadingOverlay,
  Modal,
  Paper,
  Space,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import Link from "next/link";
import usePostCritique from "@/app/hooks/critique/usePostCritique";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import useDeleteCritique from "@/app/hooks/critique/useDeleteCritique";
import useDeleteArticle from "@/app/hooks/adminArticleAction/useDeleteArticle";

interface IProps {
  userId: number;
  articleId: number;
}

interface IFormInput {
  titreCritique: string;
  descriptionCritique: string;
}

export default function ArticleBox({ userId, articleId }: IProps) {
  const router = useRouter();

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

  const onSuccessCallback = () => {
    router.push("/dashboard");
  };

  const { mutate: postCritique, isPending: isPostingPending } = usePostCritique(
    () => onSuccessCallback()
  );

  const { mutate: deleteCritique, isPending: isDeletePending } =
    useDeleteCritique(() => onSuccessCallback());

  const { mutate: deleteArticle, isPending: deleteIsPending } =
    useDeleteArticle(() => onSuccessCallback());

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
      <Box
        key={article!.id}
        mb="20"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: "20px",
        }}
      >
        <div className="bg-white px-4 py-6 rounded-md ">
          <Title order={2}> {article?.titreArticle}</Title>
          <Text size="md">{article!.contenu}</Text>
          <p>{article!.archive}</p>
          <Space h="sm" />
          {article!.pdfPath ? (
            <Text
              c="blue"
              td="underline"
              component={Link}
              href={`${article!.pdfPath}`}
            >
              Voir le fichier
            </Text>
          ) : (
            <>Aucun fichier</>
          )}
          <div className=" flex flex-row justify-between ml-2 mt-2">
            <Text size="sm">
              Posté le {new Date(article!.datePubArticle).toLocaleString("fr")}
            </Text>
            {message === "Author" ? (
              <Button onClick={open} color="red">
                Effacer
              </Button>
            ) : null}
          </div>
        </div>
        <Box className="flex justify-between">
          <Modal opened={opened} onClose={close} title="Supprimer">
            Voulez-vous vraiment supprimer ?
            <Button onClick={() => handleDeleteArticle()} color="red">
              Oui
            </Button>
          </Modal>
        </Box>
      </Box>
      <form
        className="bg-teal-100 px-4 py-6 rounded-lg"
        hidden={message === "Author"}
        onSubmit={form.onSubmit((values) => handlePostCritique(values))}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack>
            <div className="ml-2 ">
              <Text size="lg" fw={700}>
                Poster un critique en tant que {message} de l&apos;article
              </Text>
            </div>
            <TextInput
              classNames={{
                input: "focus:border-teal-500 focus:border-2 outline-none",
                root: "w-full",
              }}
              label="Titre du critique"
              placeholder="titre du critique"
              {...form.getInputProps("titreCritique")}
            />
            <Textarea
              classNames={{
                input: " focus:border-teal-500 focus:border-2 outline-none",
                root: "w-full",
              }}
              withAsterisk
              variant="filled"
              label="Contenu du critique"
              placeholder="Input placeholder"
              {...form.getInputProps("descriptionCritique")}
            />
            <Button color="teal.4" type="submit" disabled={isPostingPending}>
              Poster
            </Button>
          </Stack>
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
