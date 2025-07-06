INSERT INTO Role (name)
VALUES 
    ('ADMIN'),
    ('CASHIER'),
    ('EVENT_MANAGER'),
    ('SELLER'),
    ('VIEWER');

INSERT INTO User (username, password, email, verified)
VALUES 
    ('admin', '$2b$10$Ssm85UHNv4K1pcO56sDPS.FJrJpcm2gVGkFtib7mZfYobABPnkQRa', 'admin@example.com', 1);

-- Prisma will auto-generate a junction table with this name
INSERT INTO "_UserToRole" ("A", "B")
VALUES 
    (1, 1);