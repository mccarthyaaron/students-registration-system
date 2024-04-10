/*
  Warnings:

  - The values [MALE,FEMALE] on the enum `parents_gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [MALE,FEMALE] on the enum `parents_gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [BOARDING,DAY] on the enum `students_section` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `parents` MODIFY `gender` ENUM('male', 'female') NOT NULL;

-- AlterTable
ALTER TABLE `students` MODIFY `gender` ENUM('male', 'female') NOT NULL,
    MODIFY `section` ENUM('boarding', 'day') NOT NULL;
