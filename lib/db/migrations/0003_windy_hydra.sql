ALTER TABLE `questions` RENAME COLUMN `answer_on` TO `created_at`;--> statement-breakpoint
ALTER TABLE `questions` ADD `content` json;--> statement-breakpoint
ALTER TABLE `questions` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `notes` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `notes` DROP COLUMN `updated_at`;