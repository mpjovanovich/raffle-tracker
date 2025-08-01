INSERT INTO Event (name, location, start_date, end_date, ticket_price)
VALUES ('Clinton County Fair', 'Clinton County Fairgrounds', '2024-07-01T00:00:00.000Z', '2024-07-03T00:00:00.000Z', 5.00);

INSERT INTO Contest (event_id, number, closed)
VALUES 
    (1, 1, 0),
    (1, 2, 0),
    (1, 3, 0);

INSERT INTO Horse (contest_id, number, winner, scratch)
VALUES 
    (1, 1, 1, 0),
    (1, 2, 0, 0),
    (1, 3, 0, 0),
    (1, 4, 0, 0);

INSERT INTO Horse (contest_id, number, winner, scratch)
VALUES 
    (2, 1, 0, 0),
    (2, 2, 0, 0),
    (2, 3, 0, 0),
    (2, 4, 0, 1),
    (2, 5, 1, 0),
    (2, 6, 0, 0);

-- Create orders first with status
INSERT INTO "Order" (created_dttm, status)
VALUES 
    (CURRENT_TIMESTAMP, 'ISSUED'),
    (CURRENT_TIMESTAMP, 'ISSUED'),
    (CURRENT_TIMESTAMP, 'ISSUED'),
    (CURRENT_TIMESTAMP, 'ISSUED'),
    (CURRENT_TIMESTAMP, 'ISSUED');

-- Insert tickets without status field
INSERT INTO Ticket (event_id, contest_id, horse_id, order_id)
VALUES 
    (1, 1, 1, 1),
    (1, 1, 1, 1),
    (1, 1, 2, 1),
    (1, 1, 2, 2),
    (1, 1, 3, 2),
    (1, 1, 3, 2),
    (1, 1, 4, 3),
    (1, 1, 4, 3),
    (1, 1, 1, 4),
    (1, 1, 2, 4);

INSERT INTO Ticket (event_id, contest_id, horse_id, order_id)
VALUES 
    (1, 2, 5, 5),
    (1, 2, 6, 5),
    (1, 2, 7, 5),
    (1, 2, 8, 5),
    (1, 2, 9, 5),
    (1, 2, 5, 5),
    (1, 2, 6, 5),
    (1, 2, 7, 5),
    (1, 2, 8, 5),
    (1, 2, 9, 5);

INSERT INTO Role (name)
VALUES 
    ('ADMIN'),
    ('CASHIER'),
    ('EVENT_MANAGER'),
    ('SELLER'),
    ('VIEWER');

INSERT INTO User (username, password)
VALUES 
    ('admin', '$2b$10$Ssm85UHNv4K1pcO56sDPS.FJrJpcm2gVGkFtib7mZfYobABPnkQRa'),
    ('cashier', '$2b$10$Pi2bhp2RvfZ7dxBB0hQQ1Okfa6yQqSHn/EZ2tC.u037llLyfYWvB2'),
    ('manager', '$2b$10$OPPLKayHEVNkNgWEZZTVyO646xRDTfWcRfNSZUc3HUiyh0DYKm4wm'),
    ('seller', '$2b$10$qiPakzEEySRthInEZLXKHOteuDrjClc1Joiw8v0WDMWJbp6xkbHdm'),
    ('viewer', '$2y$10$IHIsfAaAh4ksYhQpg/SMb.j0FIdW2piTVp9QOzNWwYgBnV2AZhiTK'),
    ('test', '$2y$10$/QDfUp0L.EwqTMKBsY6FuOzSTnCgAaZ06mU7GSLF0AVoDTMhJr6Ke');

INSERT INTO UserRole (userId, roleId)
VALUES 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 5);