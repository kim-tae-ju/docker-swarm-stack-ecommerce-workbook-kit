#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
: "${REGISTRY:=tjghkdwp}"
: "${WEB_IMAGE:=shop-web}"
: "${API_IMAGE:=shop-api}"
: "${WORKER_IMAGE:=order-worker}"
: "${WEB_TAG:=1.1.0}"
: "${API_TAG:=1.1.0}"
: "${WORKER_TAG:=1.1.0}"

docker build -t "$REGISTRY/$WEB_IMAGE:$WEB_TAG" "$ROOT_DIR/app/shop-web"
docker build -t "$REGISTRY/$API_IMAGE:$API_TAG" "$ROOT_DIR/app/shop-api"
docker build -t "$REGISTRY/$WORKER_IMAGE:$WORKER_TAG" "$ROOT_DIR/app/order-worker"
