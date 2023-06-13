ALTER TABLE `questions` RENAME COLUMN `question_no` TO `number`;--> statement-breakpoint
ALTER TABLE `questions` RENAME COLUMN `question_name` TO `name`;--> statement-breakpoint
ALTER TABLE `questions` ADD `answer_on` datetime NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` ADD `question_day_in_sheet` int NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` DROP COLUMN `solved_date`;