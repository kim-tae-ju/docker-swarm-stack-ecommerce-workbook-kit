# Troubleshooting Guide

## 1. 서비스가 `0/N` 상태에 머무른다

### 점검

```bash
docker service ps <service-name>
docker service logs <service-name>
```

### 원인 후보

- 이미지 pull 실패
- placement constraint 불일치
- healthcheck 실패
- config/secret 이름 불일치
- 포트 충돌 또는 잘못된 환경변수

## 2. Traefik 라우팅이 되지 않는다

### 점검

- Traefik 가 manager 에 올라왔는지 확인
- 서비스 라벨이 `deploy.labels` 아래에 있는지 확인
- `traefik.http.services.<name>.loadbalancer.server.port` 가 지정되었는지 확인
- 서비스가 Traefik 와 같은 overlay network 에 연결되었는지 확인

## 3. `drain` 후 서비스가 기대와 다르게 움직인다

`drain` 은 standalone container 가 아니라 **swarm service task** 에만 영향을 줍니다. 서비스 task 는 active 노드로 재배치됩니다 [Docker Docs](https://docs.docker.com/engine/swarm/swarm-tutorial/drain-node/).

## 4. Config / Secret 을 수정했는데 반영이 안 된다

Docker Config 와 Secret 은 immutable 로 다루는 편이 안전합니다. 보통 새 이름으로 생성한 뒤 서비스에서 old/new 를 교체하는 방식이 적합합니다 [Docker Configs](https://docs.docker.com/engine/swarm/configs/) [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/).

## 5. `docker stack deploy` 가 compose 문법 문제를 낸다

`docker stack deploy` 는 최신 compose spec 전체가 아니라 **legacy Compose v3 계열** 기준이 안전합니다 [Docker Docs](https://docs.docker.com/engine/swarm/stack-deploy/).

## 6. 업데이트 후 서비스가 비정상이다

### 대응 순서

1. `docker service ps` 로 실패 task 확인
2. `docker service logs` 로 오류 확인
3. 새 이미지 태그/환경변수/config 변경점 확인
4. 즉시 `docker service update --rollback <service>` 수행

## 7. DB 가 특정 노드에만 있어야 한다

단일 DB 실습에서는 placement constraint 로 고정 배치하는 편이 학습에 유리합니다. 예를 들어 DB 전용 노드 라벨을 사용합니다.

## 8. worker 장애가 안 보인다

B안에서는 worker 로그와 Redis 큐 길이를 함께 보는 것이 좋습니다.

- worker replica 를 0 또는 1 로 줄여보기
- 잘못된 환경변수로 worker 재배포
- drain 후 다른 노드로 재스케줄링되는지 확인

## 9. 실습 후 정리

```bash
docker stack rm ecommerce-a
docker stack rm ecommerce-b
docker config ls
docker secret ls
docker volume ls
```
