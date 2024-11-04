import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, ScrollArea, Space, Text, Title } from "@mantine/core";
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

  const { pendingArticles, articles: notPendingArticles } = articles;

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
            <Title order={3}>Articles à approuver</Title>
            <Space h="md"/>
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
          <Box>
            <Text>Article not Pending</Text>
            {notPendingArticles.length > 0 ? (
              notPendingArticles.map((article) => (
                <Box key={article.id}>
                  <Text
                    c="blue"
                    td="underline"
                    component={Link}
                    href={`admin/${article.id}/assign`}
                  >
                    Assign reviewer
                  </Text>
                  <p>{article.titreArticle}</p>
                  <p>{article.contenu}</p>
                  <p>{article.status}</p>
                  <p>{article.archive}</p>
                  <p>{new Date(article.datePubArticle).toLocaleString("fr")}</p>
                  <p>{article.auteur.nom}</p>
                  <p>{article.auteur.prenom}</p>
                  <ArticleActions
                    articleId={article.id}
                    status={article.status}
                  />
                </Box>
              ))
            ) : (
              <>No article at the moment</>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}

{
  /* <Text
c="blue"
td="underline"
component={Link}
href={`admin/${article.id}/assign`}
>
Assign reviewer
</Text> */
}
