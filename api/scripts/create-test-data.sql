INSERT INTO event (name, location, start_date, end_date)
VALUES ('Clinton County Fair', 'Clinton County Fairgrounds', '2024-07-01T00:00:00.000Z', '2024-07-03T00:00:00.000Z');

INSERT INTO race (event_id, number, closed)
VALUES 
    (1, 1, 0),
    (1, 2, 0),
    (1, 3, 0);

INSERT INTO horse (race_id, number, winner, scratch)
VALUES 
    (1, 1, 1, 0),
    (1, 2, 0, 0),
    (1, 3, 0, 0),
    (1, 4, 0, 0);

INSERT INTO horse (race_id, number, winner, scratch)
VALUES 
    (2, 1, 0, 0),
    (2, 2, 0, 0),
    (2, 3, 0, 0),
    (2, 4, 0, 1),
    (2, 5, 1, 0),
    (2, 6, 0, 0);


INSERT INTO ticket (event_id, race_id, horse_id, status)
VALUES 
    (1, 1, 1, 'ISSUED'),
    (1, 1, 1, 'ISSUED'),
    (1, 1, 2, 'ISSUED'),
    (1, 1, 2, 'ISSUED'),
    (1, 1, 3, 'ISSUED'),
    (1, 1, 3, 'ISSUED'),
    (1, 1, 4, 'ISSUED'),
    (1, 1, 4, 'ISSUED'),
    (1, 1, 1, 'ISSUED'),
    (1, 1, 2, 'ISSUED');

INSERT INTO ticket (event_id, race_id, horse_id, status)
VALUES 
    (1, 2, 5, 'ISSUED'),
    (1, 2, 6, 'ISSUED'),
    (1, 2, 7, 'ISSUED'),
    (1, 2, 8, 'ISSUED'),
    (1, 2, 9, 'ISSUED'),
    (1, 2, 5, 'ISSUED'),
    (1, 2, 6, 'ISSUED'),
    (1, 2, 7, 'ISSUED'),
    (1, 2, 8, 'ISSUED'),
    (1, 2, 9, 'ISSUED');