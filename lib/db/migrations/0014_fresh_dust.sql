CREATE TABLE `striver_sheet_ai_chat_messages` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`question_no` int NOT NULL,
	`sender` enum('USER','AI') NOT NULL DEFAULT 'USER',
	`user_id` varchar(255) NOT NULL,
	`message` varchar(1500),
	`created_at` timestamp NOT NULL DEFAULT (now())
);
