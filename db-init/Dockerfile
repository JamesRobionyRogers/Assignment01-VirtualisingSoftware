FROM postgres:15

COPY init-tables.sql /init-tables.sql
COPY init.sh /init.sh

RUN chmod +x /init.sh

CMD ["/init.sh"]