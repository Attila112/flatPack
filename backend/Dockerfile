# # Use official PHP image with Apache and necessary PHP extensions
# FROM php:8.2-apache

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     git \
#     curl \
#     libpng-dev \
#     libjpeg-dev \
#     libfreetype6-dev \
#     zip \
#     unzip \
#     && docker-php-ext-configure gd --with-freetype --with-jpeg \
#     && docker-php-ext-install pdo_mysql gd

# # Install Composer
# COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# # Set working directory and copy project files
# WORKDIR /var/www/html
# COPY . .


# # Install Laravel dependencies
# RUN composer install

# # Set folder permissions
# # RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# # Expose the Apache port
# EXPOSE 80



# CMD php artisan migrate && php artisan db:seed && php artisan serve

# Use official PHP image with Apache and necessary PHP extensions
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install Laravel dependencies
RUN composer install

# Copy wait-for-it.sh script
COPY ./wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Set folder permissions (Optional)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose the Apache port
EXPOSE 8000

# Start the application with wait-for-it.sh to ensure MySQL is ready
ENTRYPOINT ["wait-for-it.sh", "db:3306", "--timeout=60", "--strict", "--"]
CMD ["bash", "-c", "php artisan migrate && php artisan db:seed && php artisan serve --host=0.0.0.0 --port=8000"]

