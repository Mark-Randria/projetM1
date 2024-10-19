import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container, Text } from "@mantine/core";
import { getSession } from "../lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken, IArticle, ICritique } from "../types/type";
import {
  GET_ARTICLES_OF_AN_USER_URL,
  GET_CRITIQUES_OF_AN_USER_URL,
} from "../constants/url";

export default async function Dashboard() {
  const session = await getSession();
  const decoded = jwt.decode(JSON.parse(session!)) as IToken;

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

  console.log(articles, critiques);
  return (
    <Container>
      <Box>Not an organisateur</Box>
      <Box>
        <Button component={Link} href="/dashboard/article">
          My Article
        </Button>
        <Button component={Link} href="/dashboard/review">
          My Review
        </Button>
        <Button component={Link} href="/dashboard/publish">
          Publish new Article
        </Button>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {articles.length > 0 ? (
          articles.map((article) => (
            <Box key={article.id}>
              <Text size="lg">My Articles</Text>
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
        {articles.length > 0 ? (
          critiques.map((critique) => (
            <Box key={critique.id}>
              <Text size="lg">My Critiques</Text>
              <p>{critique.titreCritique}</p>
              <p>{critique.descriptionCritique}</p>
              <p>{new Date(critique.datePubCritique).toLocaleString("fr")}</p>
            </Box>
          ))
        ) : (
          <>No article at the moment</>
        )}
      </Box>
    </Container>
  );
}
