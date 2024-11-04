import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Space, Text } from "@mantine/core";
import { getSession } from "../lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken, IArticle, ICritique } from "../types/type";
import {
  GET_ARTICLES_OF_AN_USER_URL,
  GET_CRITIQUES_OF_AN_USER_URL,
} from "../constants/url";
import SearchBar from "./SearchBar";
import CustomCard from "../components/CustomCard";
import CarouselBox from "./CarouselBox";

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

  return (
    <Container>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Text size="md">Not an organisateur</Text>
      </Box>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <SearchBar />
        <Space h="md" />
        <Button variant="light" component={Link} href="/dashboard/publish">
          Publish new Article
        </Button>
      </Box>
      <Box>
        <CarouselBox articles={filteredArticles} />
        <CarouselBox critiques={critiques} />
      </Box>
    </Container>
  );
}
