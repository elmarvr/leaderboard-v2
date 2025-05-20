PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_games` (
	`id` text(24) NOT NULL,
	`room_id` text(24) NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`winner_id` text(24) NOT NULL,
	`loser_id` text(24) NOT NULL,
	PRIMARY KEY(`room_id`, `id`)
);
--> statement-breakpoint
INSERT INTO `__new_games`("id", "room_id", "created_at", "updated_at", "winner_id", "loser_id") SELECT "id", "room_id", "created_at", "updated_at", "winner_id", "loser_id" FROM `games`;--> statement-breakpoint
DROP TABLE `games`;--> statement-breakpoint
ALTER TABLE `__new_games` RENAME TO `games`;--> statement-breakpoint
PRAGMA foreign_keys=ON;