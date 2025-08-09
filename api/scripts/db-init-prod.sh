#!/bin/bash

# This is screwed up and will have to be done manually.
# The env file is not available inside of the container,
# and we're trying to run this script inside of the container.
# It will fail on run, but won't ruin the deployment.

# As a workaround:
# 1. Create an env file with the DATABASE_URL set.
# 2. Run npx prisma migrate dev --name init
# 3. It will put the file in the prisma folder - move it to the data folder.
# 4. chmod 666 data/raffle.db
# 5. sqlite3 data/raffle.db < scripts/prod-data.sql

# Check if database file exists
# if [ ! -f "data/raffle.db" ]; then
#     echo "Database file not found, creating new database..."
    
#     # Create data directory if it doesn't exist
#     mkdir -p data

#     # Generate initial migration (non-interactive)
#     npx prisma migrate dev --name init
    
#     # Apply the migration
#     npx prisma migrate deploy
    
#     # Set proper permissions on the database file
#     chmod 666 data/raffle.db

#     # Seed the database
#     sqlite3 data/raffle.db < scripts/prod-data.sql 
    
#     echo "Database initialized successfully"
# else
#     echo "Database file already exists, skipping initialization"
# fi 