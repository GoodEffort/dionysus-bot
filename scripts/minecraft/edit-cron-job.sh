#!/bin/bash
task="./check-activity.sh"
screensession="minecraft"
cronschedule="*/5 * * * *"
removeOnly=false
rootdir="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

while getopts "t:c:r" flag; do
  case "${flag}" in
    t) task="${OPTARG}" ;;
    c) cronschedule="${OPTARG}" ;;
    s) screensession="${OPTARG}" ;;
    r) removeOnly=true;;
  esac
done

cd $rootdir

tmp=${TEMPDIR:-/tmp}/xyz.$$
trap "rm -f $tmp; exit 1" 0 1 2 3 13 15
b="$(basename $task)"
crontab -l | sed "/$screensesion.$b/d" > $tmp

if [ "$removeOnly"  = false ]; then
  echo removing $task from crontab
  echo "$cronschedule $task" >> $tmp
else 
  echo adding $task to crontab
fi

crontab < $tmp
rm -f $tmp
trap 0
