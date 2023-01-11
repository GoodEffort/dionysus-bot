#!/bin/bash
minecraftCommand=""
screensession="minecraft"

print_usage() {
  printf "Sends a command to the minecraft server in a screen session.\n"
  printf "send-command -c [commandname] -s [sessionname]\n"
  printf "-c [commandname] specifies the commandname. no default\n"
  printf "-s [sessionname] specifies the sessionname. default is minecraft\n"
}

while getopts 's:' flag; do
  case "${flag}" in
    s) screensession="${OPTARG}" ;;
    *) print_usage
       exit 1 ;;
  esac
done

if [ -z "$minecraftCommand" ] || [ -z $minecraftCommand ]; then
  print_usage
  exit 2
fi

screen -S $screensession -p 0 -X stuff "/$minecraftCommand^M"
