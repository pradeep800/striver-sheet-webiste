CREATE TABLE `striver_sheet_accounts` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`access_token` text,
	`expires_in` int,
	`id_token` text,
	`refresh_token` text,
	`refresh_token_expires_in` int,
	`scope` varchar(255),
	`token_type` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_feedbacks` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`create_at` timestamp DEFAULT (now()),
	`feedback_type` enum('BUG','FEEDBACK','REQUEST') NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`role` enum('USER','PROUSER','ADMIN') NOT NULL DEFAULT 'USER',
	`content` varchar(1001),
	`read` boolean NOT NULL DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_notes` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`question_no` int NOT NULL,
	`sheet_id` varchar(255) NOT NULL,
	`content` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_questions` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`sheet_id` varchar(255) NOT NULL,
	`number` int NOT NULL,
	`name` varchar(301) NOT NULL,
	`problem_status` enum('UNATTEMPTED','REMINDER','SOLVED') NOT NULL DEFAULT 'UNATTEMPTED',
	`day` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_reminders` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`due_time` timestamp NOT NULL,
	`should_send_mail` boolean,
	`mail_sended` boolean DEFAULT false,
	`user_id` varchar(255) NOT NULL,
	`question_no` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_sessions` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_tracking_questions` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`question_number` int NOT NULL,
	`user_id` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_users` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp,
	`image` varchar(255),
	`role` enum('USER','PROUSER','ADMIN') NOT NULL DEFAULT 'USER',
	`user_name` varchar(15) NOT NULL,
	`left_profile_changes` int NOT NULL DEFAULT 2,
	`description` varchar(205),
	`default_should_send_email` boolean NOT NULL DEFAULT false,
	`stripe_customer_id` varchar(255),
	`stripe_subscription_id` varchar(255),
	`stripe_price_id` varchar(255),
	`pro_subscription_end` timestamp,
	`striver_sheet_id_30_days` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `striver_sheet_verification_tokens` (
	`identifier` varchar(255) PRIMARY KEY NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts__provider__providerAccountId__idx` ON `striver_sheet_accounts` (`provider`,`providerAccountId`);--> statement-breakpoint
CREATE INDEX `accounts__userId__idx` ON `striver_sheet_accounts` (`userId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `striver_sheet_feedbacks` (`user_id`);--> statement-breakpoint
CREATE INDEX `sheet_id_idx` ON `striver_sheet_notes` (`sheet_id`);--> statement-breakpoint
CREATE INDEX `update_at_idx` ON `striver_sheet_questions` (`updated_at`);--> statement-breakpoint
CREATE INDEX `sheet_id_idx` ON `striver_sheet_questions` (`sheet_id`);--> statement-breakpoint
CREATE INDEX `reminder_creator_id_index` ON `striver_sheet_reminders` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `sessions__sessionToken__idx` ON `striver_sheet_sessions` (`sessionToken`);--> statement-breakpoint
CREATE INDEX `sessions__userId__idx` ON `striver_sheet_sessions` (`userId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `striver_sheet_tracking_questions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users__email__idx` ON `striver_sheet_users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `verification_tokens__token__idx` ON `striver_sheet_verification_tokens` (`token`);