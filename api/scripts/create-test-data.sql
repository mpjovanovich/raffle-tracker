INSERT INTO Event (name, location, start_date, end_date)
VALUES ('Clinton County Fair', 'Clinton County Fairgrounds', '2024-07-01T00:00:00.000Z', '2024-07-03T00:00:00.000Z');

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

INSERT INTO User (username, password, email, verified)
VALUES 
    ('admin', '$2b$10$Ssm85UHNv4K1pcO56sDPS.FJrJpcm2gVGkFtib7mZfYobABPnkQRa', 'admin@example.com', 1),
    ('cashier', '$2b$10$Pi2bhp2RvfZ7dxBB0hQQ1Okfa6yQqSHn/EZ2tC.u037llLyfYWvB2', 'cashier@example.com', 1),
    ('manager', '$2b$10$OPPLKayHEVNkNgWEZZTVyO646xRDTfWcRfNSZUc3HUiyh0DYKm4wm', 'manager@example.com', 1),
    ('seller', '$2b$10$qiPakzEEySRthInEZLXKHOteuDrjClc1Joiw8v0WDMWJbp6xkbHdm', 'seller@example.com', 1),
    ('viewer', '$2y$10$IHIsfAaAh4ksYhQpg/SMb.j0FIdW2piTVp9QOzNWwYgBnV2AZhiTK', 'viewer@example.com', 1);

-- Prisma will auto-generate a junction table with this name
INSERT INTO "_UserToRole" ("A", "B")
VALUES 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);