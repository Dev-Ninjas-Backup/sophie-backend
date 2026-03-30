-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
