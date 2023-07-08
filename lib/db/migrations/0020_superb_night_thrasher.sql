ALTER TABLE `feedbacks` MODIFY COLUMN `content` varchar(1001);--> statement-breakpoint
ALTER TABLE `questions` MODIFY COLUMN `name` varchar(301) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `user_name` varchar(11) NOT NULL;