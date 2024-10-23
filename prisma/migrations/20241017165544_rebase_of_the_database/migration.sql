/*
  Warnings:

  - You are about to drop the column `publie` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the `Auteur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organisateur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reviewer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contenu` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AUTEUR', 'REVIEWER');

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_auteurId_fkey";

-- DropForeignKey
ALTER TABLE "Auteur" DROP CONSTRAINT "Auteur_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Critique" DROP CONSTRAINT "Critique_reviewerId_fkey";

-- DropForeignKey
ALTER TABLE "Organisateur" DROP CONSTRAINT "Organisateur_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "Reviewer" DROP CONSTRAINT "Reviewer_utilisateurId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "publie",
ADD COLUMN     "contenu" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Auteur";

-- DropTable
DROP TABLE "Organisateur";

-- DropTable
DROP TABLE "Reviewer";

-- CreateTable
CREATE TABLE "UtilisateurArticle" (
    "utilisateurId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "UtilisateurArticle_pkey" PRIMARY KEY ("utilisateurId","articleId")
);

-- CreateIndex
CREATE INDEX "UtilisateurArticle_articleId_role_idx" ON "UtilisateurArticle"("articleId", "role");

-- AddForeignKey
ALTER TABLE "UtilisateurArticle" ADD CONSTRAINT "UtilisateurArticle_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilisateurArticle" ADD CONSTRAINT "UtilisateurArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Critique" ADD CONSTRAINT "Critique_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
