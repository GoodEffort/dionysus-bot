#!/bin/bash
minecraftCommand=$1
OPTIND=2
screensession="minecraft"

print_usage() {
  printf "Sends a command to the minecraft server in a screen session.\n"
  printf "send-command [commandname] -s [sessionname]\n"
  printf "-s [sessionname] specifies the sessionname. default is minecraft\n"
}

if [ -z "$minecraftCommand" ] || [ $minecraftCommand == "-s" ]; then
  print_usage
  exit 2
fi

while getopts 's:' flag; do
  case "${flag}" in
    s) screensession="${OPTARG}" ;;
    *) print_usage
       exit 1 ;;
  esac
done

screen -S $screensession -p 0 -X stuff "/$minecraftCommand^M"
