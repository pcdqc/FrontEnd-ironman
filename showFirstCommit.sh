#!/bin/sh
url=https://github.com/$1/$2/commits?page=
up=1
while :
do
  printf '%s%d\t' $url $up
  if wget -q --spider $url$up
  then
    echo OK
    lw=$up
    up=$((up * 2))
  else
    echo Not Found
    break
  fi
done
while :
do
  k=$(((lw + up) / 2))
  if [ $k = $lw ]
  then
    break
  fi
  printf '%s%d\t' $url $k
  if wget -q --spider $url$k
  then
    echo OK
    lw=$k
  else
    echo Not Found
    up=$k
  fi
done