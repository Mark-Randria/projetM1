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
import ArticleActions from "../ArticleActions";
import { ARTICLES_URL } from "../../constants/url";
import { IArticle } from "../../types/type";
import CustomCardAdminHistory from "@/app/components/CustomCardAdminHistory";

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

  const { articles: notPendingArticles } = articles;

  return (
    <>
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
              <Title order={3}>Historique des articles</Title>
              <Text component={Link} href={`/admin`} c="blue" size="lg" fw={500}>
                Retour au dashboard
              </Text>
            </Box>
            <Space h="md" />
            <ScrollArea h={600}>
              {notPendingArticles.length > 0 ? (
                notPendingArticles.map((article) => (
                  <CustomCardAdminHistory key={article.id} article={article}>
                    <ArticleActions
                      articleId={article.id}
                      status={article.status}
                      selectDisabled
                    />
                  </CustomCardAdminHistory>
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