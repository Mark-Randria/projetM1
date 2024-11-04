import { z } from "zod";

export const userCreationSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const articleCreationSchema = z.object({
  titreArticle: z.string(),
  contenu: z.string(),
  auteurId: z.number(),
  file: z
    .any()
    .refine(
      (file) => file === null || (file && file.type === "application/pdf"),
      {
        message: "File must be a PDF",
      }
    )
    .optional(),
    
});

export const articleStatusSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
});

export const assignReviewerSchema = z.object({
  reviewerId: z.number(),
});

export const critiqueCreationSchema = z.object({
  titreCritique: z.string(),
  descriptionCritique: z.string(),
  reviewerId: z.number(),
  articleId: z.number(),
});

export const critiqueUpdateSchema = z.object({
  titreCritique: z.string(),
  descriptionCritique: z.string(),
});
