INSERT INTO event (name, location, start_date, end_date)
VALUES ('Clinton County Fair', 'Clinton County Fairgrounds', '2024-07-01', '2024-07-03');

INSERT INTO race (event_id, race_number, closed)
VALUES 
    (1, 1, 0),
    (1, 2, 0);

INSERT INTO horse (race_id, number, winner, scratched)
VALUES 
    (1, 1, 1, 0),
    (1, 2, 0, 0),
    (1, 3, 0, 0),
    (1, 4, 0, 0);

INSERT INTO horse (race_id, number, winner, scratched)
VALUES 
    (2, 1, 0, 0),
    (2, 2, 0, 0),
    (2, 3, 0, 0),
    (2, 4, 0, 1),
    (2, 5, 1, 0),
    (2, 6, 0, 0);


INSERT INTO ticket (event_id, race_id, horse_id, status)
VALUES 
    (1, 1, 1, 0),
    (1, 1, 1, 0),
    (1, 1, 2, 0),
    (1, 1, 2, 0),
    (1, 1, 3, 0),
    (1, 1, 3, 0),
    (1, 1, 4, 0),
    (1, 1, 4, 0),
    (1, 1, 1, 0),
    (1, 1, 2, 0);

INSERT INTO ticket (event_id, race_id, horse_id, status)
VALUES 
    (1, 2, 5, 0),
    (1, 2, 6, 0),
    (1, 2, 7, 0),
    (1, 2, 8, 0),
    (1, 2, 9, 0),
    (1, 2, 5, 0),
    (1, 2, 6, 0),
    (1, 2, 7, 0),
    (1, 2, 8, 0),
    (1, 2, 9, 0);