import { Badge, Button, Modal, Paper, Space, Text, Title } from "@mantine/core";
import React from "react";
import { IArticle } from "../types/type";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

type CustomCardAdminProps = {
  article?: IArticle;
  children?: React.ReactNode;
};

const CustomCardAdmin = ({ article, children }: CustomCardAdminProps) => {
  // const { id,titreArticle, datePubArticle, auteur, contenu } = article;
  if (!article) return null;
  return (
    <div className=" flex flex-row gap-3 mb-2 justify-between bg-teal-100 rounded-md w-[650px] h-[200px] px-6 py-4 border drop-shadow-sm">
      <div className="flex flex-col">
        <Title order={3}> {article.titreArticle}</Title>
        <Space h="md" />
        <Text lineClamp={4}>{article.contenu}</Text>
        <Space h="md" />
        <div className="ml-2">
          <Text size="xs">
            Ecrit par {article.auteur.prenom} {article.auteur.nom}
          </Text>
          <Text size="xs">
            {new Date(article.datePubArticle).toLocaleString("fr")}
          </Text>
          <Text
            c="teal "
            td="underline"
            component={Link}
            href={`admin/${article.id}/assign`}
          >
            Assigner un reviewer
          </Text>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomCardAdmin;
