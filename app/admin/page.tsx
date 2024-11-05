import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  ScrollArea,
  Space,
  Text,
  Title,
} from "@mantine/core";
import ArticleActions from "./ArticleActions";
import { ARTICLES_URL } from "../constants/url";
import { IArticle } from "../types/type";
import CustomCardAdmin from "../components/CustomCardAdmin";

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
      <div className="absolute top-4 left-4">
        <Title order={2}>Dashboard Organisateur</Title>
      </div>
      <Container size="sm" className="pt-4">
        <Box
          m={40}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Box>
            <Box className="flex flex-row justify-between items-center mx-2">
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
            <ScrollArea h={600}>
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
                <>No article at the moment</>
              )}
            </ScrollArea>
          </Box>
        </Box>
      </Container>
    </>
  );
}
