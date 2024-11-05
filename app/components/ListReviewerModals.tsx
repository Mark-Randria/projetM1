"use client";

import { Box, Text, Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ICritique } from "../types/type";

interface IProps {
  critiques: ICritique[];
}

export default function ListReviewerModals({ critiques }: IProps) {
  const [opened, { open, close }] = useDisclosure(false);
  if (!critiques) return null;

  const uniqueReviewers = Array.from(
    new Map(
      critiques.map((critique) => [critique.reviewer.id, critique.reviewer])
    ).values()
  );

  console.log(critiques);
  return (
    <Box>
      <Text
        size="xs"
        onClick={open}
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        Voir les reviewers
      </Text>

      <Modal opened={opened} onClose={close} title="Liste des Reviewers">
        {uniqueReviewers.length > 0 ? (
          uniqueReviewers.map((reviewer) => (
            <Box key={reviewer.id}>
              <Text>{`${reviewer.nom} ${reviewer.prenom}`}</Text>
            </Box>
          ))
        ) : (
          <Text>Aucun reviewer assigné</Text>
        )}
      </Modal>
    </Box>
  );
}
