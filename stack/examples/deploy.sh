#!/usr/bin/env bash
set -euo pipefail
STACK_NAME=${1:-ecommerce-a}
COMPOSE_FILE=${2:-stack/base/stack-a.yml}
docker stack deploy -c "$COMPOSE_FILE" "$STACK_NAME"
