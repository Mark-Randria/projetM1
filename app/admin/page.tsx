import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Text } from "@mantine/core";
import { ARTICLES_URL } from "../constants/url";
import { IArticle } from "../types/type";

// DELETE AND NAVIGATION AND STATUS TO AN ARTICLE ATAOVY ATO
// SERVER COMPONENT ITO FA AZA ATAO CLIENT COMPONENTS
// DONC FADY USE CLIENT FA RAKETO LINK AN' NEXT
export default async function Page() {
  let data = await fetch(ARTICLES_URL, {
    next: {
      revalidate: 10,
    },
  });

  const articles = (await data.json()) as IArticle[];
  console.log(articles);
  return (
    <Container>
      <p>Hehehe</p>
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
            </Box>
          ))
        ) : (
          <>No article at the moment</>
        )}
      </Box>
    </Container>
  );
}
