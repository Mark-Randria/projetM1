"use client";

import { Box, Text, Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IAuteur, ICritique } from "../types/type";

interface IProps {
  critiques: ICritique[];
  bigData: any;
}

export default function ListReviewerModals({ critiques, bigData }: IProps) {
  const [opened, { open, close }] = useDisclosure(false);
  if (!critiques) return null;

  const uniqueReviewers = bigData.UtilisateurArticle;

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
        <Box>
          {uniqueReviewers.length > 0 ? (
            uniqueReviewers.map((u: any, index: number) => (
              <Box key={u.utilisateur.id}>
                <Text>{` ${index + 1} -  ${u.utilisateur.nom} ${u.utilisateur.prenom}`}</Text>
              </Box>
            ))
          ) : (
            <Text>Aucun reviewer assigné</Text>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
