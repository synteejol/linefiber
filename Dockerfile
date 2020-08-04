FROM alpine:3.8


#EXPOSE 80nan

#VOLUME ["/var/moodledata"]

RUN apk update \
 && apk add --no-cache \
                       git \
                       apache2 \
                       php7 \
                       php7-pdo_mysql \
                       php7-apache2 \
                       php7-iconv \
                       php7-mysqli \
                       php-session \
                       php7-json \
                       php7-xml \
                       php7-curl \
                       php7-zip \
                       php7-zlib \
                       php7-gd \
                       php7-dom \
                       php7-xmlreader \
                       php7-openssl \
                       php7-xmlrpc \
                       php7-soap \
                       php7-intl \
                       php7-opcache \
                       php7-ctype \
                       mariadb-client \
                       nano

#COPY ./dist /tmp

COPY ./lf-php-server /tmp/app
RUN cd /tmp \
 && rm -rf /var/www/localhost/htdocs \
# && ls \
# && mv create.php app \
# && mv database.php app \
# && mv test.php app \
# && mv db_conn.php app \
 && mv app /var/www/localhost/htdocs \
 && chown apache:apache -R /var/www/localhost/htdocs \
# && sed -i 's/Listen 80/Listen getenv(\'PORTA\')/g' /etc/apache2/httpd.conf  \
 && mkdir -p /run/apache2



RUN ln -sf /proc/self/fd/1 /var/log/apache2/access.log \
 && ln -sf /proc/self/fd/1 /var/log/apache2/error.log

RUN ls /var/www/localhost
#COPY config.php /var/www/localhost/htdocs/config.php
#COPY run.sh /opt/apache2/run.sh


CMD exec /usr/sbin/httpd -D FOREGROUND
#CMD ["/opt/apache2/run.sh"]