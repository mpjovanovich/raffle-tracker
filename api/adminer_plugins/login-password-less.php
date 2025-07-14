<?php
include_once('/var/www/html/plugins/login-password-less.php');

return new AdminerLoginPasswordLess(
    password_hash('admin', PASSWORD_DEFAULT)
);