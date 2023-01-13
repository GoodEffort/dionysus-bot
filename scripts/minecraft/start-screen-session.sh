#!/bin/bash
screensession="minecraft"
servercommand="./start-server.sh"
timeout=false
mem=""
jar=""
cwd="/home/steam/minecraft/"

while getopts 's:c:tm:j:c:' flag; do
  case "${flag}" in
    m) mem="${OPTARG}" ;;
    s) screensession="${OPTARG}" ;;
    c) servercommand="${OPTARG}" ;;
    t) timeout=true ;;
    j) jar="${OPTARG}" ;;
    c) cwd="${OPTARG}" ;;
  esac
done

servercommandflags="-s $screensession"
if [ timeout = true ]; then
  servercommandflags=servercommandflags+" -t"
fi

if [ ! -z "$mem" ]; then
  servercommandflags=servercommandflags+" -m $mem"
fi

if [ ! -z "$jar" ]; then
  servercommandflags=servercommandflags+" -j $jar"
fi

if [ ! -z "$cwd" ]; then
  servercommandflags=servercommandflags+" -c $cmd"
fi

cd $cwd

started=$(screen -ls | grep $screensession | wc -l)

if [ $started -gt 0 ]; then
  echo "Screen session $screensession already started"
  exit 16
fi

screen -d -m -S $screensession sh -c $servercommand $servercommandflags

echo "Started screen session $screensession"