#!/bin/bash
screensession="minecraft"
servercommand="./start-server.sh"
rootdir="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
timeout=false
mem=""
jar=""
cwd="/home/steam/minecraft/"

while getopts 's:c:tm:j:c:w:' flag; do
  case "${flag}" in
    m) mem="${OPTARG}" ;;
    s) screensession="${OPTARG}" ;;
    c) servercommand="${OPTARG}" ;;
    t) timeout=true ;;
    j) jar="${OPTARG}" ;;
    w) cwd="${OPTARG}" ;;
  esac
done

servercommandflags="-s $screensession"
if [ timeout = true ]; then
  servercommandflags=$servercommandflags" -t"
fi

if [ ! -z "$mem" ]; then
  servercommandflags=$servercommandflags" -m $mem"
fi

if [ ! -z "$jar" ]; then
  servercommandflags=$servercommandflags" -j $jar"
fi

if [ ! -z "$cwd" ]; then
  servercommandflags=$servercommandflags" -c $cwd"
fi

started=$(screen -ls | grep $screensession | wc -l)

if [ $started -gt 0 ]; then
  echo "Screen session $screensession already started"
  exit 16
fi

cd $rootdir

screen -dmS $screensession
screen -S $screensession -p 0 -X stuff "$servercommand $servercommandflags^M"

echo "Started screen session $screensession"