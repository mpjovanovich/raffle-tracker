INSERT INTO Role (name)
VALUES 
    ('ADMIN'),
    ('CASHIER'),
    ('EVENT_MANAGER'),
    ('SELLER'),
    ('VIEWER');

-- Terrible security practice (but we're doing it anyway)!
-- THIS USER SHOULD ABSOLUTELY BE REMOVED AFTER SETUP!
-- Any active devs should be added as admin users.
INSERT INTO User (username, password)
VALUES 
    ('RT_Admin', '$2y$10$b1qZ0292xxkEBE2ryGaVpe1J.bzuHV7ZYjaAdHCZJSCS3V8ygiNfe');

INSERT INTO UserRole (userId, roleId)
VALUES 
    (1, 1);