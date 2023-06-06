CREATE TABLE `accounts` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`access_token` text,
	`expires_in` int,
	`id_token` text,
	`refresh_token` text,
	`refresh_token_expires_in` int,
	`scope` varchar(191),
	`token_type` varchar(191),
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `note` (
	`note_id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`title` varchar(300) NOT NULL,
	`content` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`userId` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE TABLE `question` (
	`question_id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`problem_status` enum('UNATTEMPTED','REMINDER','SOLVE') NOT NULL DEFAULT 'UNATTEMPTED',
	`question_no` int NOT NULL,
	`question_name` varchar(300) NOT NULL,
	`sheet_id` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `reminder` (
	`reminder_id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`reminder_due_time` datetime NOT NULL,
	`mail_sended` boolean DEFAULT false,
	`userId` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `striverSheet` (
	`sheet_id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(191) PRIMARY KEY NOT NULL,
	`name` varchar(191),
	`email` varchar(191) NOT NULL,
	`emailVerified` timestamp,
	`image` varchar(191),
	`role` enum('USER','PROUSER','ADMIN') DEFAULT 'USER',
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` varchar(191) PRIMARY KEY NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts__provider__providerAccountId__idx` ON `accounts` (`provider`,`providerAccountId`);--> statement-breakpoint
CREATE INDEX `accounts__userId__idx` ON `accounts` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `sessions__sessionToken__idx` ON `sessions` (`sessionToken`);--> statement-breakpoint
CREATE INDEX `sessions__userId__idx` ON `sessions` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users__email__idx` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens__token__idx` ON `verification_tokens` (`token`);