/*
  Warnings:

  - You are about to drop the `proff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "proff";

-- DropTable
DROP TABLE "student";

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Prof" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjects" TEXT NOT NULL,

    CONSTRAINT "Prof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_courseStudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_courseStudents_AB_unique" ON "_courseStudents"("A", "B");

-- CreateIndex
CREATE INDEX "_courseStudents_B_index" ON "_courseStudents"("B");

-- AddForeignKey
ALTER TABLE "_courseStudents" ADD CONSTRAINT "_courseStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_courseStudents" ADD CONSTRAINT "_courseStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
