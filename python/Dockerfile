from python:2.7.14-alpine3.7

ADD crontab /etc/cron.d/crontab
ADD run.sh /opt/run.sh
RUN chmod 0644 /etc/cron.d/crontab
RUN crontab /etc/cron.d/crontab
RUN pip install SoftLayer
RUN pip install pymysql

CMD ["/usr/sbin/crond"]
