INSERT INTO event (name, location, start_date, end_date)
VALUES ('Clinton County Fair', 'Clinton County Fairgrounds', '2024-07-01T00:00:00.000Z', '2024-07-03T00:00:00.000Z');

INSERT INTO contest (event_id, number, closed)
VALUES 
    (1, 1, 0),
    (1, 2, 0),
    (1, 3, 0);

INSERT INTO horse (contest_id, number, winner, scratch)
VALUES 
    (1, 1, 1, 0),
    (1, 2, 0, 0),
    (1, 3, 0, 0),
    (1, 4, 0, 0);

INSERT INTO horse (contest_id, number, winner, scratch)
VALUES 
    (2, 1, 0, 0),
    (2, 2, 0, 0),
    (2, 3, 0, 0),
    (2, 4, 0, 1),
    (2, 5, 1, 0),
    (2, 6, 0, 0);

-- Create orders first
INSERT INTO "Order" (created_dttm)
VALUES 
    (CURRENT_TIMESTAMP),
    (CURRENT_TIMESTAMP),
    (CURRENT_TIMESTAMP),
    (CURRENT_TIMESTAMP),
    (CURRENT_TIMESTAMP);

-- Insert tickets with order associations
INSERT INTO ticket (event_id, contest_id, horse_id, order_id, status)
VALUES 
    (1, 1, 1, 1, 'ISSUED'),
    (1, 1, 1, 1, 'ISSUED'),
    (1, 1, 2, 1, 'ISSUED'),
    (1, 1, 2, 2, 'ISSUED'),
    (1, 1, 3, 2, 'ISSUED'),
    (1, 1, 3, 2, 'ISSUED'),
    (1, 1, 4, 3, 'ISSUED'),
    (1, 1, 4, 3, 'ISSUED'),
    (1, 1, 1, 4, 'ISSUED'),
    (1, 1, 2, 4, 'ISSUED');

INSERT INTO ticket (event_id, contest_id, horse_id, order_id, status)
VALUES 
    (1, 2, 5, 5, 'ISSUED'),
    (1, 2, 6, 5, 'ISSUED'),
    (1, 2, 7, 5, 'ISSUED'),
    (1, 2, 8, 5, 'ISSUED'),
    (1, 2, 9, 5, 'ISSUED'),
    (1, 2, 5, 5, 'ISSUED'),
    (1, 2, 6, 5, 'ISSUED'),
    (1, 2, 7, 5, 'ISSUED'),
    (1, 2, 8, 5, 'ISSUED'),
    (1, 2, 9, 5, 'ISSUED');