#!/usr/bin/env bash
set -euo pipefail
STACK_NAME=${1:-ecommerce-a}

docker stack services "$STACK_NAME"
echo
docker service ls | grep "$STACK_NAME" || true
