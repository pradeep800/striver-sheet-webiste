ALTER TABLE `reminders` RENAME COLUMN `creator_id` TO `user_id`;--> statement-breakpoint
DROP INDEX `reminder_creator_id_index` ON `reminders`;--> statement-breakpoint
CREATE INDEX `reminder_creator_id_index` ON `reminders` (`user_id`);