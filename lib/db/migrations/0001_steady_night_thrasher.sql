ALTER TABLE `accounts` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `userId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `type` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `provider` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `providerAccountId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `scope` varchar(255);--> statement-breakpoint
ALTER TABLE `accounts` MODIFY COLUMN `token_type` varchar(255);--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `sessionToken` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` MODIFY COLUMN `userId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `image` varchar(255);--> statement-breakpoint
ALTER TABLE `verification_tokens` MODIFY COLUMN `identifier` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `verification_tokens` MODIFY COLUMN `token` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `stripe_customer_id` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripe_subscription_id` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripe_price_id` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `pro_subscription_end` datetime;