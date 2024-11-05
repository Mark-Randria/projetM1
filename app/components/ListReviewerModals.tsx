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

      <Modal opened={opened} onClose={close} title="List of Reviewers">
        {critiques.length > 0 ? (
          critiques.map((critique, index) => (
            <Box key={critique.id}></Box>
          ))
        ) : (
          <Text>Aucun reviewer trouvé</Text>
        )}
      </Modal>
    </Box>
  );
}
