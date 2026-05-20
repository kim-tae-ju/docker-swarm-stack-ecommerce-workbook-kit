#!/usr/bin/env bash
set -euo pipefail
SERVICE=${1:-ecommerce-a_shop-api}
IMAGE=${2:-your-registry.example.com/workbook/shop-api:1.1.0}
docker service update --image "$IMAGE" --update-parallelism 1 --update-delay 10s "$SERVICE"
