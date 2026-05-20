#!/usr/bin/env bash
set -euo pipefail
: "${REGISTRY:=tjghkdwp}"
: "${WEB_IMAGE:=shop-web}"
: "${API_IMAGE:=shop-api}"
: "${WORKER_IMAGE:=order-worker}"
: "${WEB_TAG:=1.1.0}"
: "${API_TAG:=1.1.0}"
: "${WORKER_TAG:=1.1.0}"

docker push "$REGISTRY/$WEB_IMAGE:$WEB_TAG"
docker push "$REGISTRY/$API_IMAGE:$API_TAG"
docker push "$REGISTRY/$WORKER_IMAGE:$WORKER_TAG"
