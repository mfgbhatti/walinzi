#!/usr/bin/env bash
REG=$1
PAT=$2
mapfile -t result<<<"$(grep -r -E "$REG" src/app  | sed -E 's/(.*):.*/\1/')"
i=0
while [ "$i" -le "${#result[@]}" ]; do
sed -n -i -E "s#$REG#$PAT#g" "${result[$i]}"
i=$(( i + 1 ))
done

