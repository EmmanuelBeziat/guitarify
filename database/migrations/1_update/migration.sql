-- CreateTable
CREATE TABLE `guitarbrands` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `picture` VARCHAR(255) NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guitars` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `brandId` SMALLINT UNSIGNED NOT NULL,
    `model` VARCHAR(50) NOT NULL,
    `serialNumber` VARCHAR(30) NULL,
    `numberOfStrings` TINYINT UNSIGNED NOT NULL,
    `lastStringChange` DATE NULL,
    `tuningId` SMALLINT UNSIGNED NOT NULL,
    `stringsId` SMALLINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` DATETIME(0) NULL,
    `userId` SMALLINT UNSIGNED NOT NULL,
    `picture` VARCHAR(255) NULL,
    `informations` TEXT NULL,
    `yearProduction` DATE NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    INDEX `guitars_brandId_fkey`(`brandId`),
    INDEX `guitars_stringsId_fkey`(`stringsId`),
    INDEX `guitars_tuningId_fkey`(`tuningId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guitarstrings` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(16) NOT NULL,
    `model` VARCHAR(40) NULL,
    `gauge` VARCHAR(10) NULL,
    `strings` SMALLINT UNSIGNED NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guitartuning` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `numberOfStrings` TINYINT UNSIGNED NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `shortName` VARCHAR(10) NULL,
    `tuning` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `shortName`(`shortName`),
    UNIQUE INDEX `tuning`(`tuning`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlists` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(60) NOT NULL,
    `userId` SMALLINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` DATETIME(0) NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlistsongs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `playlistId` SMALLINT UNSIGNED NOT NULL,
    `songId` SMALLINT UNSIGNED NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` DATETIME(3) NULL,

    INDEX `playlistId`(`playlistId`),
    INDEX `songId`(`songId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `songmastery` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `label`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `songs` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `url` VARCHAR(160) NOT NULL,
    `songKey` VARCHAR(80) NOT NULL,
    `tuningId` SMALLINT UNSIGNED NULL,
    `masteryId` SMALLINT UNSIGNED NULL,
    `tablatureURL` VARCHAR(255) NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    UNIQUE INDEX `url`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(80) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` DATETIME(0) NULL,
    `userlevel` TINYINT UNSIGNED NOT NULL DEFAULT 2,

    UNIQUE INDEX `uuid`(`uuid`),
    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `guitars` ADD CONSTRAINT `guitars_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `guitarbrands`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guitars` ADD CONSTRAINT `guitars_stringsId_fkey` FOREIGN KEY (`stringsId`) REFERENCES `guitarstrings`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `guitars` ADD CONSTRAINT `guitars_tuningId_fkey` FOREIGN KEY (`tuningId`) REFERENCES `guitartuning`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `playlistsongs` ADD CONSTRAINT `playlistId` FOREIGN KEY (`playlistId`) REFERENCES `playlists`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `playlistsongs` ADD CONSTRAINT `songId` FOREIGN KEY (`songId`) REFERENCES `songs`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

