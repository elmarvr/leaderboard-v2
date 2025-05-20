CREATE TABLE `games` (
	`id` text(24) NOT NULL,
	`room_id` text(24) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`winner_id` integer NOT NULL,
	`loser_id` integer NOT NULL,
	PRIMARY KEY(`room_id`, `id`),
	FOREIGN KEY (`winner_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`loser_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `participants` (
	`id` text(24) NOT NULL,
	`room_id` text(24) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`email` text NOT NULL,
	PRIMARY KEY(`room_id`, `id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email` ON `participants` (`room_id`,`email`);--> statement-breakpoint
CREATE INDEX `email_global` ON `participants` (`email`);--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`title` text NOT NULL,
	`code` text(6) NOT NULL,
	`password` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_code_unique` ON `rooms` (`code`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);