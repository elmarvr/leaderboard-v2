CREATE TABLE `games` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`room_id` integer NOT NULL,
	`winner_id` integer,
	`loser_id` integer,
	`updated_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`winner_id`) REFERENCES `members`(`id`) ON UPDATE cascade ON DELETE set null,
	FOREIGN KEY (`loser_id`) REFERENCES `members`(`id`) ON UPDATE cascade ON DELETE set null
);
