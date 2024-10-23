import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Text } from "@mantine/core";
import ArticleActions from "./ArticleActions";
import { ARTICLES_URL } from "../constants/url";
import { IArticle } from "../types/type";

export default async function Page() {
  let data = await fetch(ARTICLES_URL, {
    next: {
      revalidate: 0,
    },
  });

  const articles = (await data.json()) as IArticle[];

  return (
    <Container size="sm">
      <p>Hehehe Admin</p>
      <Box
        m={40}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          {articles.length > 0 ? (
            articles.map((article) => (
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
  );
}
