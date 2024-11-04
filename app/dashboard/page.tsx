import Image from "next/image";
import Link from "next/link";
import { Button, Space, Text, Title } from "@mantine/core";
import { getSession } from "../lib/sessionManagement";
import jwt from "jsonwebtoken";
import { IToken, IArticle, ICritique } from "../types/type";
import {
  GET_ARTICLES_OF_AN_USER_URL,
  GET_CRITIQUES_OF_AN_USER_URL,
} from "../constants/url";
import SearchBar from "./SearchBar";
import { Carousel } from '@mantine/carousel';
import CustomCard from "../components/CustomCard";
import { CustomButton } from "../components/Button";

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

  const capitalizeFirstLetter = (string:any) => {
    if (!string) return ''; // Gérer les cas où la chaîne est vide ou nulle
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="pt-4">
      <div className="flex justify-between mx-6 ">
       <div>
        <Title order={2}>Bienvenue {capitalizeFirstLetter(decoded.user.prenom)}</Title>
        
       </div>
        <SearchBar />
        <CustomButton variant="light" component={Link} href="/dashboard/publish">
          Publish new Article
        </CustomButton>
      </div>
      <Space h="xl" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <CustomCard key={article.id} article={article} />  

          ))
        ) : (
          <div>No article at the moment</div>
        )}
        {/* {articles.length > 0 ? (
          critiques.map((critique) => (
            <div key={critique.id}>
              <Text size="lg">Liste des articles a critiquer</Text>
              <p>{critique.Article.titreArticle}</p>
              <p>{critique.Article.contenu}</p>
              <p>
                critiqué le{" "}
                {new Date(critique.datePubCritique).toLocaleString("fr")}
              </p>

              <Text
                c="blue"
                td="underline"
                component={Link}
                href={`dashboard/article/${critique.articleId}`}
              >
                See article
              </Text>
            </div>
          ))
        ) : (
          <div>No Article to review</div>
        )} */}
      </div>
    </div>
  );
}


// <div key={article.id} mb="20">
            //   <Text size="lg">Liste de mes articles</Text>
            //   <p>{article.titreArticle}</p>
            //   <Text
            //     c="blue"
            //     td="underline"
            //     component={Link}
            //     href={`dashboard/article/${article.id}`}
            //   >
            //     See article
            //   </Text>
            //   <p>{article.contenu}</p>
            //   <p>{article.status}</p>
            //   <p>{article.archive}</p>
            //   <p>
            //     posté le {new Date(article.datePubArticle).toLocaleString("fr")}
            //   </p>
            //   <p>{article.auteur.nom}</p>
            //   <p>{article.auteur.prenom}</p>
            // </div>
