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
            <CustomCard stuff={article} />
          </Carousel.Slide>
        ))
      ) : critiques && critiques.length > 0 ? (
        critiques.map((critique) => (
          <Carousel.Slide key={critique.id}>
            <CustomCard stuff={critique} />
          </Carousel.Slide>
        ))
      ) : (
        <Carousel.Slide>
          <Box>Aucun article trouvé</Box>
        </Carousel.Slide>
      )}
    </Carousel>
  );
}
