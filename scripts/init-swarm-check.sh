#!/usr/bin/env bash
set -euo pipefail

echo "[INFO] node ls"
docker node ls

echo
echo "[INFO] swarm status"
docker info --format '{{.Swarm.LocalNodeState}} / manager={{.Swarm.ControlAvailable}} / node={{.Name}}'
