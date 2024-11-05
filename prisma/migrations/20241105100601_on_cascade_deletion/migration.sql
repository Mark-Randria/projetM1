-- DropForeignKey
ALTER TABLE "Critique" DROP CONSTRAINT "Critique_articleId_fkey";

-- DropForeignKey
ALTER TABLE "UtilisateurArticle" DROP CONSTRAINT "UtilisateurArticle_articleId_fkey";

-- AddForeignKey
ALTER TABLE "UtilisateurArticle" ADD CONSTRAINT "UtilisateurArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Critique" ADD CONSTRAINT "Critique_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
