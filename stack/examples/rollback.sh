#!/usr/bin/env bash
set -euo pipefail
SERVICE=${1:-ecommerce-a_shop-api}
docker service update --rollback "$SERVICE"
