CREATE TABLE `striver_sheet_ai_chat_messages` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`question_no` int NOT NULL,
	`sender` enum('USER','AI') NOT NULL DEFAULT 'USER',
	`user_id` varchar(255) NOT NULL,
	`message` text,
	`created_at` int NOT NULL
);
--> statement-breakpoint
CREATE INDEX `created_at_index` ON `striver_sheet_ai_chat_messages` (`created_at`);