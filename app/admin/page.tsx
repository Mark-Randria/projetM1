import Image from "next/image";
import Link from "next/link";
import { Box, Button, Container } from "@mantine/core";
import { ARTICLES_URL } from "../constants/url";
import { IArticle } from "../types/type";

export default async function Page() {
  let data = await fetch(ARTICLES_URL, {
    next: {
      revalidate: 10,
    },
  });
  const articles = (await data.json()) as IArticle[];
  console.log(articles);
  return (
    <main>
      <p>Hehehe</p>
      <Box>
        {articles.map((article) => (
          <Box key={article.id}>
            <p>{article.titreArticle}</p>
            <p>{article.contenu}</p>
            <p>{article.status}</p>
            <p>{article.archive}</p>
            <p>{new Date(article.datePubArticle).toLocaleString("fr")}</p>
            <p>{article.auteur.nom}</p>
            <p>{article.auteur.prenom}</p>
          </Box>
        ))}
      </Box>
    </main>
  );
}
