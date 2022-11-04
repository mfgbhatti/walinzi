#!/usr/bin/env bash
REG=$1
PAT=$2
mapfile -t result<<<"$(grep -r -E "$REG" src/app  | sed -E 's/(.*):.*/\1/')"
i=0
if [ -z "$PAT" ]; then
  echo "checking existance"
  grep -r -E "$REG" src/app
else
  while [ "$i" -lt "${#result[@]}" ]; do
  sed -i -E "s#$REG#$PAT#g" "${result[$i]}"
  i=$(( i + 1 ))
  done
fi
