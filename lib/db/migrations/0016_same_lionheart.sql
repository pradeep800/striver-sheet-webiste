CREATE TABLE `feedbacks` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`feedback_type` enum('REPORT','FEEDBACK','REQUEST') NOT NULL,
	`userId` varchar(255) NOT NULL,
	`role` enum('USER','PROUSER','ADMIN') NOT NULL DEFAULT 'USER',
	`content` varchar(1000));
--> statement-breakpoint
CREATE INDEX `userIdIndex` ON `feedbacks` (`userId`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `tracking_questions` (`userId`);