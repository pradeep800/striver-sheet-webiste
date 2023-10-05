CREATE TABLE `striver_sheet_ai_chat_messages` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`question_no` int NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`message` varchar(1500),
	`created_at` timestamp DEFAULT (now())
);
--> statement-breakpoint
CREATE INDEX `userId_index` ON `striver_sheet_ai_chat_messages` (`user_id`);