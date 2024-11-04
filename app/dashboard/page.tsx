import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Space, Text, Title } from "@mantine/core";
import { getSession } from "../lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken, IArticle, ICritique } from "../types/type";
import {
  GET_ARTICLES_OF_AN_USER_URL,
  GET_CRITIQUES_OF_AN_USER_URL,
} from "../constants/url";
import SearchBar from "./SearchBar";
import { Carousel } from "@mantine/carousel";
import CustomCard from "../components/CustomCard";
import CarouselBox from "./CarouselBox";
import { CustomButton } from "../components/Button";

interface IProps {
  searchParams: { title?: string; content?: string };
}

export default async function Dashboard({ searchParams }: IProps) {
  const session = await getSession();
  const decoded = jwt.decode(JSON.parse(session!)) as IToken;

  const title = searchParams.title?.toLowerCase() || "";
  const content = searchParams.content?.toLowerCase() || "";

  let articleData = await fetch(
    GET_ARTICLES_OF_AN_USER_URL(decoded.user.id.toString()),
    {
      next: {
        revalidate: 10,
      },
    }
  );
  let critiqueData = await fetch(
    GET_CRITIQUES_OF_AN_USER_URL(decoded.user.id.toString()),
    {
      next: {
        revalidate: 10,
      },
    }
  );

  const articles = (await articleData.json()) as IArticle[];
  const critiques = (await critiqueData.json()) as ICritique[];

  const filteredArticles = articles.filter((article) => {
    const matchesTitle = article.titreArticle.toLowerCase().includes(title);
    const matchesContent = article.contenu.toLowerCase().includes(content);

    return matchesTitle && matchesContent;
  });

  // Pour mettre la premiere lettre majuscule
  const capitalizeFirstLetter = (string:any) => {
    if (!string) return ''; // Gérer les cas où la chaîne est vide ou nulle
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="pt-4">
      <div className="flex justify-between mx-6 ">
        <div>
          <Title order={2}>
            Bienvenue {capitalizeFirstLetter(decoded.user.prenom)}
          </Title>
        </div>
        <SearchBar />
        <CustomButton
          variant="light"
          component={Link}
          href="/dashboard/publish"
        >
          Publish new Article
        </CustomButton>
      </div>
      <Space h="xl" />
      <Box>
        <CarouselBox articles={filteredArticles} />
        <Space h="xl" />
        <Text c="cyan">Critiques</Text>
        <CarouselBox critiques={critiques} />
      </Box>
    </div>
  );
}
