#!/usr/bin/env bash
set -euo pipefail
STACK_NAME=${1:-ecommerce-a}

docker stack services "$STACK_NAME"
docker stack ps "$STACK_NAME"
