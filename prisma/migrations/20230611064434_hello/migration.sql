/*
  Warnings:

  - Added the required column `category_code` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category_name" TEXT NOT NULL,
    "category_code" TEXT NOT NULL
);
INSERT INTO "new_Category" ("category_name", "id") SELECT "category_name", "id" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_category_code_key" ON "Category"("category_code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
