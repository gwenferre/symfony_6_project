FROM php:8.1.11-fpm

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libicu-dev \
        libpq-dev \
        libxpm-dev \
        libvpx-dev \
        libssh2-1-dev \
        libssh2-1 \
        mono-complete \
        libcanberra-gtk-module \
        libzip-dev \
        zip \
    && pecl install xdebug-3.2.0RC1 \
    && docker-php-ext-enable xdebug \
    && pecl install ssh2-1.3.1 \
    && docker-php-ext-enable ssh2 \
    && docker-php-ext-install -j$(nproc) intl \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install -j$(nproc) intl \
    && docker-php-ext-install -j$(nproc) pgsql \
    && docker-php-ext-install -j$(nproc) pdo_pgsql \
    && docker-php-ext-install -j$(nproc) exif \
    && docker-php-ext-install -j$(nproc) mysqli \
    && docker-php-ext-install -j$(nproc) zip \
    && docker-php-ext-configure gd

# composer
RUN php -r "readfile('https://getcomposer.org/installer');" | php -- --install-dir=/usr/local/bin --filename=composer \
    && chmod +x /usr/local/bin/composer

# Local User
ARG UID
ARG GID
RUN groupadd php -g $UID \
    && useradd -g $GID -u $UID --create-home php

WORKDIR /var/www/html