-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjects" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subjects" TEXT NOT NULL,

    CONSTRAINT "proff_pkey" PRIMARY KEY ("id")
);
