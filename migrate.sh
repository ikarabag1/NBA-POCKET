#!/bin/bash
# Migration script for Render deployment

echo "🔄 Running database migrations..."

# Run Sequelize migrations
npx sequelize-cli db:migrate

# Check if migrations succeeded
if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully"
else
    echo "❌ Migrations failed"
    exit 1
fi
