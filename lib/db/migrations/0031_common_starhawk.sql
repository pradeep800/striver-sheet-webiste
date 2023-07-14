CREATE TABLE `notes` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`question_no` int NOT NULL,
	`sheet_id` varchar(255) NOT NULL,
	`content` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);
--> statement-breakpoint
DROP TABLE `testing`;--> statement-breakpoint
DROP INDEX `userIdIndex` ON `feedbacks`;--> statement-breakpoint
DROP INDEX `user_id_idx` ON `tracking_questions`;--> statement-breakpoint
ALTER TABLE `feedbacks` ADD `create_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `feedbacks` ADD `user_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` ADD `day` int NOT NULL;--> statement-breakpoint
ALTER TABLE `tracking_questions` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `tracking_questions` ADD `question_number` int NOT NULL;--> statement-breakpoint
ALTER TABLE `tracking_questions` ADD `user_id` varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX `sheet_id_idx` ON `notes` (`sheet_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `feedbacks` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `tracking_questions` (`user_id`);--> statement-breakpoint
ALTER TABLE `feedbacks` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `feedbacks` DROP COLUMN `userId`;--> statement-breakpoint
ALTER TABLE `questions` DROP COLUMN `content`;--> statement-breakpoint
ALTER TABLE `questions` DROP COLUMN `question_day_in_sheet`;--> statement-breakpoint
ALTER TABLE `tracking_questions` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `tracking_questions` DROP COLUMN `questionNumber`;--> statement-breakpoint
ALTER TABLE `tracking_questions` DROP COLUMN `userId`;