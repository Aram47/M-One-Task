/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_B_fkey";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "_friends";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friends" (
    "status" TEXT NOT NULL DEFAULT 'pending',
    "friendOfId" INTEGER NOT NULL,
    "friendsId" INTEGER NOT NULL,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("friendsId","friendOfId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friendOfId_fkey" FOREIGN KEY ("friendOfId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friendsId_fkey" FOREIGN KEY ("friendsId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
