#!/usr/bin/env bash
set -euo pipefail
STACK_NAME=${1:-ecommerce-a}
docker stack rm "$STACK_NAME"
