#!/bin/bash

rm -f data/raffle.db

# Create data directory if it doesn't exist
mkdir -p data

npx prisma generate

# Run Prisma push to create the database and tables
npx prisma db push

# Seed the database
sqlite3 data/raffle.db < scripts/test-data.sql 

# Set proper permissions on the database file
chmod 666 data/raffle.db

echo "Database initialized successfully"