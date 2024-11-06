import { Badge, Space, Text, Title } from "@mantine/core";
import React from "react";
import { IArticle, ICritique } from "../types/type";
import Link from "next/link";

type CustomCardProps = {
  stuff?: IArticle | ICritique | null; // Allow null or undefined
};

const CustomCard = ({ stuff }: CustomCardProps) => {
  if (!stuff) return <Text>Aucun contenu disponible</Text>;

  const isArticle = (stuff: IArticle | ICritique): stuff is IArticle =>
    (stuff as IArticle).titreArticle !== undefined;

  if (isArticle(stuff)) {
    return (
      <div className="flex flex-col bg-teal-100 rounded-md h-52 px-6 py-4 border drop-shadow-sm">
        <div className="flex w-full justify-between items-start">
          <Title order={3}>{stuff.titreArticle}</Title>
          <Badge
            color={
              stuff.status === "APPROVED"
                ? "blue"
                : stuff.status === "REJECTED"
                  ? "red"
                  : "yellow"
            }
          >
            {stuff.status === "APPROVED"
              ? "Approuvé"
              : stuff.status === "REJECTED"
                ? "Rejeté"
                : "En attente"}
          </Badge>
        </div>
        <Space h="md" />
        <div className="min-h-20">
        <Text lineClamp={3}>{stuff.contenu}</Text>
        </div>
        <Space h="sm" />
        <div className="flex justify-between ">
          <div className="ml-2">
            <Text size="xs">
              Ecrit par {stuff.auteur.prenom} {stuff.auteur.nom}
            </Text>
            <Text size="xs">
              {new Date(stuff.datePubArticle).toLocaleString("fr")}
            </Text>
          </div>
          <Text
            c="blue"
            td="underline"
            component={Link}
            href={`dashboard/article/${stuff.id}`}
          >
            Voir Article
          </Text>
        </div>
      </div>
    );
  } else {
    const article = stuff.Article;
    console.log(article);
    return (
      <div className="flex flex-col bg-teal-100 rounded-md h-52 px-6 py-4 border drop-shadow-sm">
        {article ? (
          <>
            <div className="flex w-full justify-between">
              <Title order={3}>{article.titreArticle}</Title>
            </div>
            <Space h="md" />
            <Text lineClamp={4}>{article.contenu}</Text>
            <Space h="md" />
            <div className="flex justify-between ">
              <div className="ml-2">
                <Text size="xs">
                  Critiqué le{" "}
                  {new Date(stuff.datePubCritique).toLocaleString("fr")}
                </Text>
              </div>
              <Text
                c="blue"
                td="underline"
                component={Link}
                href={`dashboard/article/${stuff.articleId}`}
              >
                Voir Critique
              </Text>
            </div>
          </>
        ) : (
          <Text>Aucun article à critiquer</Text>
        )}
      </div>
    );
  }
};

export default CustomCard;
