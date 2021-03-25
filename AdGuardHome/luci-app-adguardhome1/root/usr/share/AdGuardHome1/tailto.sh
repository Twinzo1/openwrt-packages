#!/bin/sh
tail -n $1 "$2" > /var/run/tailtmp1
cat /var/run/tailtmp1 1> "$2"
rm /var/run/tailtmp1