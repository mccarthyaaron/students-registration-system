/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_categorytopost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytopost` DROP FOREIGN KEY `_CategoryToPost_B_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_userId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `role`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uuid`);

-- DropTable
DROP TABLE `_categorytopost`;

-- DropTable
DROP TABLE `categories`;

-- DropTable
DROP TABLE `posts`;

-- DropTable
DROP TABLE `profiles`;

-- CreateTable
CREATE TABLE `students` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `studentID` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `class` ENUM('KG1', 'KG2', 'KG3', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7') NOT NULL,
    `section` ENUM('BOARDING', 'DAY') NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `parentUuids` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `students_studentID_key`(`studentID`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parents` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `email` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ParentToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ParentToStudent_AB_unique`(`A`, `B`),
    INDEX `_ParentToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ParentToStudent` ADD CONSTRAINT `_ParentToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `parents`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ParentToStudent` ADD CONSTRAINT `_ParentToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `students`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `users_email_key` TO `Users_email_key`;
