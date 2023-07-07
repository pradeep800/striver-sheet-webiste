ALTER TABLE `reminders` ADD `should_send_mail` boolean;--> statement-breakpoint
ALTER TABLE `users` ADD `email_reminders` boolean DEFAULT true;