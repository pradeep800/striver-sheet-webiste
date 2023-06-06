CREATE TABLE `accounts` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	PRIMARY KEY(`provider`,`providerAccountId`)
);
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
	`sessionToken` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL);
--> statement-breakpoint
CREATE TABLE `striverSheet` (
	`sheet_id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`user_id` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`role` enum('USER','PROUSER','ADMIN') DEFAULT 'USER',
	`emailVerified` timestamp,
	`image` varchar(255));
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	PRIMARY KEY(`identifier`,`token`)
);
