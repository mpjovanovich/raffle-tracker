INSERT INTO Role (name)
VALUES 
    ('ADMIN'),
    ('CASHIER'),
    ('EVENT_MANAGER'),
    ('SELLER'),
    ('VIEWER');

INSERT INTO User (username, password)
VALUES 
    ('RT_Admin', '$2y$10$b1qZ0292xxkEBE2ryGaVpe1J.bzuHV7ZYjaAdHCZJSCS3V8ygiNfe');

-- Prisma will auto-generate a junction table with this name
INSERT INTO "_UserToRole" ("A", "B")
VALUES 
    (1, 1);