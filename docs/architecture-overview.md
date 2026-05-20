# Architecture Overview

## 공통 환경

- 노드 구성: `swarm-manager`, `swarm-worker1`, `swarm-worker2`
- 배포 주체: manager 노드
- 오케스트레이션: Docker Swarm + Docker Stack
- Ingress: Traefik
- 네트워크: `edge`, `app`, `data` overlay

## Part A 아키텍처

```text
Client
  -> Traefik (manager)
     -> shop-web (replicated)
        -> shop-api (replicated)
           -> MariaDB (single)
           -> Redis (single)
```

### 목적

Part A는 가장 기본적인 스택 배포 흐름을 빠르게 익히는 데 초점을 둡니다.

- ingress 라우팅 이해
- 서비스 복제와 상태 점검
- DB/캐시 연결 점검
- config/secret 분리
- 배포 후 운영 명령 실습

## Part B 아키텍처

```text
Client
  -> Traefik (manager)
     -> shop-web (replicated)
        -> shop-api (replicated)
           -> Redis (single)
           -> MariaDB (single)
           -> order-worker (replicated)
```

### 목적

Part B는 장애대응 중심입니다.

- worker 장애 유도
- node drain 후 재배치 확인
- 잘못된 업데이트 후 rollback
- queue 기반 비동기 처리 확인
- 운영 체크리스트 수행

## 서비스별 역할

### Traefik

- 외부 80 포트를 수신
- Swarm provider 사용
- 서비스 라벨 기반 라우팅
- manager 노드 고정 배치 권장

### shop-web

- 간단한 이커머스 UI 제공
- 상품 목록, 장바구니, 주문 화면
- `API_BASE_URL` 환경변수로 API 호출

### shop-api

- 상품, 장바구니, 주문 API 제공
- health/ready/admin 엔드포인트 제공
- Docker Config 및 Secret 값을 읽어 동작

### MariaDB

- 상품/주문 영속 저장
- 단일 replica 로 실습 단순화

### Redis

- 캐시 및 주문 큐 저장
- worker 실습에서 핵심 메시지 브로커 역할

### order-worker

- Redis 큐 소비
- 주문 후처리 상태 업데이트
- 장애 유도 시 재시작/재배치 실습 대상

## 네트워크 설계

### edge

- Traefik 와 web 이 연결되는 외부 진입점 네트워크

### app

- web / api / worker 간 내부 통신

### data

- api / db / redis 간 내부 데이터 통신

## 배치 전략

- Traefik: `node.role == manager`
- MariaDB: `node.hostname == swarm-worker1` 같은 고정 예시 제공
- Redis: 단일 replica
- shop-web / shop-api / order-worker: replicated 모드
- B안에서 `spread` 또는 worker 제약 예시 포함

## 공식 기준 반영

- `docker stack deploy` 는 manager 에서 실행 [Docker Docs](https://docs.docker.com/engine/swarm/stack-deploy/)
- scaling, rolling update, rollback, placement 는 service 운영의 핵심 [Docker Docs](https://docs.docker.com/engine/swarm/services/)
- `drain` 은 해당 노드의 swarm task 를 active 노드로 재배치 [Docker Docs](https://docs.docker.com/engine/swarm/swarm-tutorial/drain-node/)
- Traefik Swarm provider 는 `deploy.labels` 와 명시적 backend port 설정이 중요 [Traefik Docs](https://doc.traefik.io/traefik/reference/install-configuration/providers/swarm/)
