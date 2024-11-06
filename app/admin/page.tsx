import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  rem,
  ScrollArea,
  Space,
  Text,
  Title,
} from "@mantine/core";
import ArticleActions from "./ArticleActions";
import { ARTICLES_URL } from "../constants/url";
import { IArticle } from "../types/type";
import CustomCardAdmin from "../components/CustomCardAdmin";
import { IconLogout } from "@tabler/icons-react";
import { logoutSession } from "../lib/sessionManagement";
import Header from "./Header";

interface IArticleProps {
  pendingArticles: IArticle[];
  articles: IArticle[];
}

export default async function Page() {
  let data = await fetch(ARTICLES_URL, {
    next: {
      revalidate: 0,
    },
  });

  const articles = (await data.json()) as IArticleProps;

  const { pendingArticles } = articles;

  return (
    <>
      <Header>Dashboard Organisateur</Header>
      <Container size="sm" className="py-2 rounded-lg bg-white">
        <Box
          m={40}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Box>
            <Box className="flex flex-row justify-between items-center ">
              <Title order={3}>Articles à approuver</Title>
              <Text
                component={Link}
                href={`admin/history`}
                c="blue"
                size="lg"
                fw={500}
              >
                Historique des articles
              </Text>
            </Box>
            <Space h="md" />
            <ScrollArea h={500}>
              {pendingArticles.length > 0 ? (
                pendingArticles.map((article) => (
                  <CustomCardAdmin key={article.id} article={article}>
                    <ArticleActions
                      articleId={article.id}
                      status={article.status}
                    />
                  </CustomCardAdmin>
                ))
              ) : (
                <Container>Aucun article pour le moment</Container>
              )}
            </ScrollArea>
          </Box>
        </Box>
      </Container>
    </>
  );
}
