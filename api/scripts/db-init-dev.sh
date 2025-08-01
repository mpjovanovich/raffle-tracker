#!/bin/bash

# Just in case this hasn't been run yet.
npx prisma generate

# Remove the database file if it exists
rm -f data/raffle.db

# Create data directory if it doesn't exist
mkdir -p data
touch data/raffle.db
chmod 666 data/raffle.db

# Push the schema to the database
npx prisma db push

# Seed the database
sqlite3 data/raffle.db < scripts/test-data.sql 

echo "Database initialized successfully"