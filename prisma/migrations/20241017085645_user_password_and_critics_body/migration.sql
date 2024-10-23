/*
  Warnings:

  - Added the required column `descriptionCritique` to the `Critique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titreCritique` to the `Critique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motdepasse` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Critique" ADD COLUMN     "descriptionCritique" TEXT NOT NULL,
ADD COLUMN     "titreCritique" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "motdepasse" TEXT NOT NULL;
