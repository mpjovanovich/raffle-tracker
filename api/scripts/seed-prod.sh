#!/bin/bash

# Check if any users exist in the database
USER_COUNT=$(sqlite3 data/raffle.db "SELECT COUNT(*) FROM User;")

if [ "$USER_COUNT" -gt 0 ]; then
    echo "Users already exist in database, skipping seed"
    exit 0
fi

echo "No users found, running seed script"
sqlite3 data/raffle.db < scripts/prod-data.sql 