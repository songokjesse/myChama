-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191),
    `idNumber` INTEGER NOT NULL,
    `phoneNumber` VARCHAR(191),
    `userId` INTEGER NOT NULL,
UNIQUE INDEX `Profile.idNumber_unique`(`idNumber`),
UNIQUE INDEX `Profile.userId_unique`(`userId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191),
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chamaContribution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `myChamaId` INTEGER NOT NULL,
    `profileId` INTEGER NOT NULL,
    `amountContributed` INTEGER NOT NULL,
UNIQUE INDEX `chamaContribution.myChamaId_unique`(`myChamaId`),
UNIQUE INDEX `chamaContribution.profileId_unique`(`profileId`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `myChama` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chamaName` VARCHAR(191),
    `chamaDescription` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamaContribution` ADD FOREIGN KEY (`myChamaId`) REFERENCES `myChama`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chamaContribution` ADD FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
