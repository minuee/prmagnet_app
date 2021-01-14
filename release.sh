#!/usr/bin/env bash
# 배포 시 변수 값 자동 설정

filepath1="./src/common/constants.js"
tmpfile1="./.tmp1.js"

sTxt1="PRODUCTION = false"
tTxt1="PRODUCTION = true"
sTxt2="STAGE = true"
tTxt2="STAGE = false"
sTxt3="test[^@]\{0,2\}@ruu.kr"
tTxt3="test1@ruu.kr"
tTxt31="test3@ruu.kr"
tTxt32="test4@ruu.kr"
tTxt33="test5@ruu.kr"
sTxt4="STORYBOOK = true"
tTxt4="STORYBOOK = false"
sMsg="PRODUCTION"
if [ "$1" == "stg" ]; then
  sTxt1="PRODUCTION = true"
  tTxt1="PRODUCTION = false"
  sTxt2="STAGE = false"
  tTxt2="STAGE = true"
  sMsg="STAGE"
elif [ "$1" == "storybook" ]; then
  sTxt1="PRODUCTION = true"
  tTxt1="PRODUCTION = false"
  sTxt2="STAGE = true"
  tTxt2="STAGE = false"
  sTxt4="STORYBOOK = false"
  tTxt4="STORYBOOK = true"
  sMsg="STORYBOOK"
elif [ "$1" == "dev" ]; then
  sTxt1="PRODUCTION = true"
  tTxt1="PRODUCTION = false"
  sTxt2="STAGE = true"
  tTxt2="STAGE = false"
  sMsg="DEVELOPMENT"
  if [ $(id -F) == "compert" ]; then
    tTxt3="${tTxt31}"
  elif [ $(id -F) == "doheon" ]; then
    tTxt3="${tTxt32}"
  elif [ $(id -F) == "box8741" ]; then
    tTxt3="${tTxt33}"
  fi
fi

if [ -e $filepath1 ]; then
  cat $filepath1 \
  | sed -e "s/${sTxt1}/${tTxt1}/"  \
  | sed -e "s/${sTxt2}/${tTxt2}/"  \
  | sed -e "s/${sTxt3}/${tTxt3}/"  \
  | sed -e "s/${sTxt4}/${tTxt4}/"  \
  > $tmpfile1
  'mv' $tmpfile1 $filepath1
  if [ $(grep "${tTxt1}" $filepath1 | wc -l) -eq 1 -a $(grep "${tTxt2}" $filepath1 | wc -l) -eq 1 ]; then
    echo "${sMsg} UPDATE OK";
  fi
else
  echo "no such file ${PWD}/src/common/constants.js"
fi
