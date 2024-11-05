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
import Header from "../admin/Header";
import{} from"@tabler/icons-react"

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
        revalidate: 0,
      },
    }
  );
  let critiqueData = await fetch(
    GET_CRITIQUES_OF_AN_USER_URL(decoded.user.id.toString()),
    {
      next: {
        revalidate: 0,
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
  const capitalizeFirstLetter = (string: any) => {
    if (!string) return ""; // Gérer les cas où la chaîne est vide ou nulle
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  console.log(critiques);

  return (
    <div className=" relativemin-h-screen  pt-4 px-4">
      <div className="ml-3">
        <Header>Bienvenue {capitalizeFirstLetter(decoded.user.prenom)}</Header>
      </div>
      {/* <div className="flex justify-between mx-6 ">      
        <SearchBar />
       
      </div> */}
      <Space h="xl" />
      <div>
        <CarouselBox articles={filteredArticles} />
        <Space h="xl" />
        <Text c="cyan">Critiques</Text>
        <CarouselBox critiques={critiques} />
      </div>

      <div className="absolute bottom-20 right-20">
        <Button classNames={{
          root:"h-12 w-12 within"
        }} variant="filled" size="xl" radius="xl" color="teal.4" component={Link} href="/dashboard/publish">
          Publier
        </Button>
      </div>
    </div>
  );
}
