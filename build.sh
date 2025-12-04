#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
npm install

# Run database migrations
npx sequelize-cli db:migrate
