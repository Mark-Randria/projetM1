"use client";

import { Carousel } from "@mantine/carousel";
import { Box, Text } from "@mantine/core";
import CustomCard from "../components/CustomCard";
import { IArticle, ICritique } from "../types/type";
import Link from "next/link";

interface CarouselBoxProps {
  articles?: IArticle[];
  critiques?: ICritique[];
}

export default function CarouselBox({ articles, critiques }: CarouselBoxProps) {
  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      controlSize={40}
      slideGap="xs"
      align="start"
      slidesToScroll={3}
    >
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <Carousel.Slide key={article.id}>
            <CustomCard article={article} />
          </Carousel.Slide>
        ))
      ) : critiques && critiques.length > 0 ? (
        critiques.map((critique) => (
          <Carousel.Slide key={critique.id}>
            <Box>
              <Text size="lg">Liste des articles à critiquer</Text>
              <p>{critique.Article.titreArticle}</p>
              <p>{critique.Article.contenu}</p>
              <p>
                critiqué le{" "}
                {new Date(critique.datePubCritique).toLocaleString("fr")}
              </p>
              <Text
                component={Link}
                href={`dashboard/article/${critique.articleId}`}
              >
                See article
              </Text>
            </Box>
          </Carousel.Slide>
        ))
      ) : (
        <Carousel.Slide>
          <Box>No items available</Box>
        </Carousel.Slide>
      )}
    </Carousel>
  );
}
