#!/bin/sh
PATH="/usr/sbin:/usr/bin:/sbin:/bin"
logread -e AdGuardHome1 > /tmp/AdGuardHome1tmp.log
logread -e AdGuardHome1 -f >> /tmp/AdGuardHome1tmp.log &
pid=$!
echo "1">/var/run/AdGuardHome1syslog
while true
do
	sleep 12
	watchdog=$(cat /var/run/AdGuardHome1syslog)
	if [ "$watchdog"x == "0"x ]; then
		kill $pid
		rm /tmp/AdGuardHome1tmp.log
		rm /var/run/AdGuardHome1syslog
		exit 0
	else
		echo "0">/var/run/AdGuardHome1syslog
	fi
done