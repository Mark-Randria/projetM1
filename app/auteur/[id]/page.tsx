"use client";
import { CustomButton } from "@/app/components/Button";
import { CustomTextArea } from "@/app/components/CustomTextArea";
import { CustomInput } from "@/app/components/Input";
import { Paper, Space, Stack, Title } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Page = () => {
  const afficher = () => {
    alert("Publié");
  };

  return (
    <div>
      <Title order={2}> Bienvenue Monsieur Antonio</Title>
     <Link href="/auteur/1/lists">
        <CustomButton text="Ma liste" variant="light"  />
     </Link>
      <Space h="md" />
      <form className="flex justify-center mt-20">
        <Paper shadow="md" radius="md" withBorder className=" px-6 py-8 w-1/2">
          <Stack className="w-full">
            <Title order={3}> Publier un article</Title>
            <CustomInput placeholder="Titre de l'article" label="Titre" />
            <CustomTextArea
              placeholder="Contenu de l'article"
              label="Contenu de l'article"
            />
            <CustomButton variant="filled" text="Publier" onClick={afficher} />
          </Stack>
        </Paper>
      </form>
    </div>
  );
};

export default Page;
