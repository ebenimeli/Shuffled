#!/bin/bash

echo "Pulling..."
git pull

echo "Building..."

WEB=/var/www/vhosts/esferatic.com/httpdocs
if [[ -d "$WEB" ]]; then
  echo "Copying web to $WEB ..."
  cp -r /home/ebenimeli/GitHub/Shuffled/* "$WEB"
fi