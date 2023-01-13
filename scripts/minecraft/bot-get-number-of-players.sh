#!/bin/bash
port=25565
rootdir="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

while getopts 'p:' flag; do
  case "${flag}" in
    p) port="${OPTARG}" ;;
    *) printf "Invalid Arg, -p [portnumber] is the only flag, default is 25565\n"
       exit 1 ;;
  esac
done

cd $rootdir

players="$(./get-number-of-players.sh -p $port)"
echo "There are $players players online."
