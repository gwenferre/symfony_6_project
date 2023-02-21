#!/usr/bin/env bash

container=$1
if [ -z ${container} ]; then
    container='php';
fi

docker exec -it symfony_${container} /bin/bash -c "export TERM=xterm-256color; exec bash;"