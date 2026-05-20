# Operations Cheatsheet

## Stack

```bash
docker stack deploy -c stack/base/stack-a.yml ecommerce-a
docker stack deploy -c stack/base/stack-b.yml ecommerce-b
docker stack services ecommerce-a
docker stack ps ecommerce-a
docker stack rm ecommerce-a
```

## Service 조회

```bash
docker service ls
docker service ps ecommerce-a_shop-web
docker service inspect ecommerce-a_shop-api --pretty
```

## Scale

```bash
docker service scale ecommerce-a_shop-web=3
docker service scale ecommerce-a_shop-api=4
docker service scale ecommerce-b_order-worker=1
```

## Rolling Update

```bash
docker service update \
  --image REGISTRY/shop-api:1.1.0 \
  --update-parallelism 1 \
  --update-delay 10s \
  ecommerce-a_shop-api
```

## Rollback

```bash
docker service update --rollback ecommerce-a_shop-api
```

## Node 제어

```bash
docker node ls
docker node inspect swarm-worker1 --pretty
docker node update --availability drain swarm-worker1
docker node update --availability active swarm-worker1
```

## Placement label

```bash
docker node update --label-add zone=az1 swarm-worker1
docker node update --label-add zone=az2 swarm-worker2
docker node update --label-add db=true swarm-worker1
```

## Config / Secret

```bash
docker config ls
docker secret ls
docker config create web-banner-v2 configs/app/web-banner-v2.json
docker secret create jwt_secret_v2 secrets-example/jwt_secret.txt
```

## 로그/상태 점검

```bash
docker service logs -f ecommerce-a_shop-api
docker service logs -f ecommerce-b_order-worker
curl http://MANAGER_HOST/health
curl http://MANAGER_HOST/api/health
```

## 공식 참고

- Stack deploy / remove [Docker Docs](https://docs.docker.com/engine/swarm/stack-deploy/)
- Service update / rollback / placement [Docker Docs](https://docs.docker.com/engine/swarm/services/)
- Drain node [Docker Docs](https://docs.docker.com/engine/swarm/swarm-tutorial/drain-node/)
