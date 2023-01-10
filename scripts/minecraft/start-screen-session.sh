#!/bin/bash
screensession="minecraft"
servercommand="/home/steam/minecraft/scripts/start-server.sh"
timeout=false
mem=""
jar=""
cwd=""

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

screen -d -m -S $screensession sh -c $servercommand $servercommandflags
