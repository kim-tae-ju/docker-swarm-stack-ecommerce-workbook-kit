#!/usr/bin/env bash
set -euo pipefail
: "${REGISTRY_USERNAME:=your-username}"
: "${REGISTRY_PASSWORD:=your-password}"
: "${REGISTRY_HOST:=your-registry.example.com}"

echo "$REGISTRY_PASSWORD" | docker login "$REGISTRY_HOST" -u "$REGISTRY_USERNAME" --password-stdin
