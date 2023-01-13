#!/bin/bash
port=25565
screensession=minecraft
min=60
now=$(date +%s)
send="./send-command.sh"

while getopts 's:p:' flag; do
  case "${flag}" in
    p) port="${OPTARG}" ;;
    s) screensession="${OPTARG}" ;;
    l) lines="${OPTARG}" ;;
    m) min="${OPTARG}" ;;
    n) now="${OPTARG}" ;;
  esac
done

cd "${0%/*}"

numberOfPlayers=$(./get-number-of-players.sh -p $port)

if (($numberOfPlayers > 0)); then
  "$numberOfPlayers:$now:" >> ./activity/$screensession
  echo "$numberOfPlayers players online"
fi

startup="s"
startupweight="1"
readarray activity < ./activity/$screensession
playersinmin=0

for row in ${activity[@]}; do
  readarray -d: -t rowarray <<< ${row}
  ago=$(($now - ${rowarray[1]}))
  ago=$(($ago / 60))
  if ((ago > min)); then
    sed -i "/$(echo ${rowarray[1]})/d" ./activity/$screensession
  else
    p="${rowarray[0]}"
    activeplayers="${p/s/"$startupweight"}"
    playersinmin=$(($playersinmin+$activeplayers))
  fi
done

echo "$playersinmin players in last hour (non unique)"

if ((playersinmin == 0)); then
  $send stop -s $screensession
  ./edit-cron-job.sh -r
fi
