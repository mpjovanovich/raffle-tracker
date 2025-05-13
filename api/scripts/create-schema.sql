CREATE TABLE IF NOT EXISTS event (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name TEXT NOT NULL UNIQUE,
    location TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS race (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    race_number INTEGER NOT NULL CHECK (race_number > 0),
    closed INTEGER DEFAULT 0 NOT NULL CHECK (closed IN (0, 1)),
    UNIQUE(event_id, race_number),
    FOREIGN KEY (event_id) REFERENCES event(id)
);

CREATE TABLE IF NOT EXISTS horse (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    race_id INTEGER NOT NULL,
    horse_number INTEGER NOT NULL CHECK (horse_number > 0),
    winner INTEGER DEFAULT 0 NOT NULL CHECK (winner IN (1, 0)), 
    scratched INTEGER DEFAULT 0 NOT NULL CHECK (scratched IN (1, 0)), 
    UNIQUE(race_id, horse_number),
    FOREIGN KEY (race_id) REFERENCES race(id)
);

CREATE TABLE IF NOT EXISTS ticket (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    -- We will denormalize the data to make it easier to query
    -- Most of the time we will query this table for everything
    event_id INTEGER NOT NULL,
    race_id INTEGER NOT NULL,
    horse_id INTEGER NOT NULL,
    created_dttm TEXT DEFAULT (datetime('now', 'localtime')) NOT NULL,
    redeemed_dttm TEXT NULL,
    refunded_dttm TEXT NULL,
    status INTEGER NOT NULL DEFAULT 0 CHECK (status IN (0, 1, 2)),
    --0: "Issued/Valid"
    --1: "Redeemed"
    --2: "Refunded"
    FOREIGN KEY (event_id) REFERENCES event(id),
    FOREIGN KEY (race_id) REFERENCES race(id),
    FOREIGN KEY (horse_id) REFERENCES horse(id)
);

-- May help with report; not sure yet
CREATE INDEX IF NOT EXISTS idx_ticket_horse ON ticket(horse_id);