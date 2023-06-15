CREATE TABLE `trackingQuestion` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`questionNumber` int NOT NULL);
