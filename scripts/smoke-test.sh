#!/usr/bin/env bash
set -euo pipefail
BASE_URL=${1:-http://localhost}

curl -fsS "$BASE_URL/" >/dev/null && echo "web ok"
curl -fsS "$BASE_URL/api/health" && echo
curl -fsS "$BASE_URL/api/products" && echo
