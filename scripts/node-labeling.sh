#!/usr/bin/env bash
set -euo pipefail

docker node update --label-add zone=bz1 swarm-worker1 || true
docker node update --label-add zone=bz2 swarm-worker2 || true
docker node update --label-add db=true swarm-worker1 || true

docker node inspect swarm-worker1 --format '{{json .Spec.Labels}}'
docker node inspect swarm-worker2 --format '{{json .Spec.Labels}}'
