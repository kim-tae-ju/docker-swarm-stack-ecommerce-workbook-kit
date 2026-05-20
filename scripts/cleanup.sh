#!/usr/bin/env bash
set -euo pipefail

docker stack rm ecommerce-a || true
docker stack rm ecommerce-b || true
