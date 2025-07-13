#!/bin/bash

rm -f data/raffle.db
mkdir -p data
npx prisma generate
npx prisma db push
sqlite3 data/raffle.db < scripts/test-data.sql 
chmod 666 data/raffle.db

echo "Database initialized successfully"