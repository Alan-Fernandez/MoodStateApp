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
fi

# Wait for database to be ready
echo "Waiting for database connection..."
php -r "
\$host = getenv('DB_HOST');
\$port = getenv('DB_PORT');
\$maxTries = 60;
for (\$i = 0; \$i < \$maxTries; \$i++) {
    \$conn = @fsockopen(\$host, \$port);
    if (\$conn) {
        fclose(\$conn);
        echo 'Database is ready!' . PHP_EOL;
        exit(0);
    }
    echo 'Waiting for database...' . PHP_EOL;
    sleep(2);
}
echo 'Database not ready.' . PHP_EOL;
exit(1);
"

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Run seeders
echo "Running seeders..."
php artisan db:seed --force

# Start the application
echo "Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=8000
