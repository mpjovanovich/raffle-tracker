#!/bin/bash

# Check if database file exists
if [ ! -f "data/raffle.db" ]; then
    echo "Database file not found, creating new database..."
    
    # Create data directory if it doesn't exist
    mkdir -p data

    # Generate initial migration (non-interactive)
    npx prisma migrate dev --name init --create-only
    
    # Apply the migration
    npx prisma migrate deploy
    
    # Seed the database
    sqlite3 data/raffle.db < scripts/prod-data.sql 
    
    # Set proper permissions on the database file
    chmod 666 data/raffle.db
    
    echo "Database initialized successfully"
else
    echo "Database file already exists, skipping initialization"
fi 