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
import Header from "../components/Header/Header";
import {} from "@tabler/icons-react";
import { capitalizeFirstLetter } from "../lib/letterManipulation";


interface IProps {
  searchParams: { search?: string | string[] };
}

export default async function Dashboard({ searchParams }: IProps) {
  const session = await getSession();
  const decoded = jwt.decode(JSON.parse(session!)) as IToken;

  const search = searchParams.search;
  

  const searchArray = Array.isArray(search)
    ? search.map((s) => s.toLowerCase())
    : [search?.toLowerCase() || ""];

  let articleData = await fetch(
    GET_ARTICLES_OF_AN_USER_URL(decoded.user.id.toString()),
    {
      // next: {
      //   revalidate: 0,
      // },
      cache: "no-cache",
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
    const matchesStatus =
      searchArray.length === 0 ||
      (searchArray.length === 1 && searchArray[0] === "") ||
      searchArray.some((status) => article.status.toLowerCase() === status);

    return matchesStatus;
  });

  

  return (
    <div className="relative min-h-screen  pt-4 px-4">
      <div className="ml-3">
        <Header
          text={`Bienvenue ${capitalizeFirstLetter(decoded.user.prenom)}`}
        >
          <SearchBar />
        </Header>
      </div>
      <Space h="xl" />
      <div>
        <CarouselBox articles={filteredArticles} />
        <Space h="xl" />
        <div className="ml-2">
          <Title order={3}>Liste des articles à critiquer</Title>
        </div>
        <Space h="md" />
        <CarouselBox critiques={critiques} />
      </div>

      <div className="absolute bottom-12 right-20">
        <Button
          classNames={{
            root: "h-12 w-12 within",
          }}
          variant="filled"
          size="xl"
          radius="xl"
          color="teal.4"
          component={Link}
          href="/dashboard/publish"
        >
          Publier
        </Button>
      </div>
    </div>
  );
}
