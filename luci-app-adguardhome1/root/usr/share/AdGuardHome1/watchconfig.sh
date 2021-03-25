#!/bin/sh
PATH="/usr/sbin:/usr/bin:/sbin:/bin"
configpath=$(uci get AdGuardHome1.AdGuardHome.configpath)
while :
do
	sleep 10
	if [ -f "$configpath" ]; then
		/etc/init.d/AdGuardHome1 do_redirect 1
		break
	fi
done
return 0