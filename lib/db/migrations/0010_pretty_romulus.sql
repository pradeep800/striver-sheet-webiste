CREATE TABLE `striver_sheet_verification_tokens` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`token` text NOT NULL,
	`expires` datetime NOT NULL
);
