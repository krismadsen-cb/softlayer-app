FROM httpd:latest
COPY ldap.conf /usr/local/apache2/conf/conf.d/ldap.conf
RUN echo "Include conf/conf.d/*.conf" >> /usr/local/apache2/conf/httpd.conf
EXPOSE 443
