ALTER TABLE `users` RENAME COLUMN `email_reminders` TO `default_should_send_email`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `ban_user`;