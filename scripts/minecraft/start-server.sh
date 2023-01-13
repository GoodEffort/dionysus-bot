#!/bin/bash
mem="5G"
jar="./mc-server-1.19.2.jar"
screensession="minecraft"
minecraftInstallationDir="/home/steam/minecraft/"
rootdir="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
timeout=false

while getopts 'm:s:j:c:t' flag; do
  case "${flag}" in
    m) mem="${OPTARG}" ;;
    s) screensession="${OPTARG}" ;;
    j) jar="${OPTARG}" ;;
    c) minecraftInstallationDir="${OPTARG}" ;;
    t) timeout=true ;;
  esac
done

servercommand="java -Xmx$mem -Xms$mem \
        -XX:+UseG1GC -XX:+ParallelRefProcEnabled \
        -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions \
        -XX:+DisableExplicitGC -XX:+AlwaysPreTouch \
        -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 \
        -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 \
        -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 \
        -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 \
        -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 \
        -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 \
        -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true \
        -jar $jar \
        /"

#echo $servercommand
echo "Starting Minecraft server with $mem of memory using the $jar as the server jar"
touch $rootdir/activity/$screensession
echo "s:$(date +%s):" >> $rootdir/activity/$screensession

if [ $timeout = true ] ; then
  ./edit-cron-job.sh
fi

cd $minecraftInstallationDir

until $servercommand; do
        echo "Minecraft server crashed with exit code $?. Restarting in 10 seconds" >&2
        sleep 10
done

cd $rootdir

echo "Server closed successfully!"

if [ $timeout = true ] ; then
  ./edit-cron-job.sh -r
fi
