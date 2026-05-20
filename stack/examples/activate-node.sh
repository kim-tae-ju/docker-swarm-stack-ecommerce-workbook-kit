#!/usr/bin/env bash
set -euo pipefail
NODE=${1:-swarm-worker1}
docker node update --availability active "$NODE"
