import { Badge, Button, Modal, Paper, Space, Text, Title } from "@mantine/core";
import React from "react";
import { IArticle } from "../types/type";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

type CustomCardProps = {
  article: IArticle ;
};

const CustomCard = ({ article }: CustomCardProps) => {
  // const { id,titreArticle, datePubArticle, auteur, contenu } = article;

  return (
    <div className=" flex flex-col bg-teal-100 rounded-md h-52 px-6 py-4 border drop-shadow-sm">
      <div className="flex w-full justify-between">
        <Title order={3}> {article.titreArticle}</Title>
        <Badge color="yellow">{article.status}</Badge>
      </div>
      <Space h="md" />
      <Text lineClamp={4}>{article.contenu}</Text>
      <Space h="md" />
      <div className="flex justify-between ">
        <div className="ml-2">
          <Text size="xs">
            Ecrit par {article.auteur.prenom} {article.auteur.nom}
          </Text>
          <Text size="xs">
          {new Date(article.datePubArticle).toLocaleString("fr")}
          </Text>
        </div>
        <Text
          c="blue"
          td="underline"
          component={Link}
          href={`dashboard/article/${article.id}`}
        >
          Voir Article
        </Text>
      </div>
    </div>
  );
};

export default CustomCard;
