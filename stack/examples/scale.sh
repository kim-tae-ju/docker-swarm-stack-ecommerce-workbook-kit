#!/usr/bin/env bash
set -euo pipefail
SERVICE=${1:-ecommerce-a_shop-web}
REPLICAS=${2:-3}
docker service scale "$SERVICE=$REPLICAS"
