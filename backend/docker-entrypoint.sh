#!/bin/sh

# Exit on error
set -e

# Install dependencies if vendor folder doesn't exist
if [ ! -d "vendor" ]; then
    echo "Installing Composer dependencies..."
    composer install --no-progress --no-interaction
fi

# Copy .env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
    php artisan jwt:secret --force
fi

# Wait for database to be ready
echo "Waiting for database connection..."
# Simple wait loop (could be improved with wait-for-it.sh)
sleep 10

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Run seeders
echo "Running seeders..."
php artisan db:seed --force

# Start the application
echo "Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=8000
