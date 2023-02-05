FROM php:8-fpm
WORKDIR /var/www
EXPOSE 9000
CMD ["php-fpm"]