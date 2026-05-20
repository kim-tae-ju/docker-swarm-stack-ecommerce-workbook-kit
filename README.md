# Docker Swarm Stack E-Commerce Workbook Kit

이 패키지는 `swarm-manager / swarm-worker1 / swarm-worker2` 3노드 환경에서 **Docker Stack 기반 배포와 운영 제어**를 실습하도록 만든 완성형 워크북/소스 번들입니다.

## 구성 요약

- **Part A**: 실무형 기본기
  - Traefik + Shop Web + Shop API + MariaDB + Redis
  - `docker stack deploy` 중심 배포
  - scale, rolling update, rollback, drain/active, config/secret 갱신 실습
- **Part B**: 장애대응형 확장판
  - Part A + `order-worker`
  - 장애 유도, 재스케줄링, 복구, 잘못된 업데이트 후 롤백 실습

## 빠른 시작

1. manager 노드에서 작업 디렉터리로 이동합니다.
2. 필요하면 사설 레지스트리 또는 공용 레지스트리 주소를 `.env`에 맞게 조정합니다.
3. 이미지를 빌드/푸시합니다.
4. `stack/base/stack-a.yml` 또는 `stack/base/stack-b.yml`로 배포합니다.
5. `docs/workbook-a.md` 또는 `docs/workbook-b.md`를 따라 실습합니다.

## 권장 순서

1. `docs/architecture-overview.md`
2. `docs/workbook-a.md`
3. `docs/operations-cheatsheet.md`
4. `docs/workbook-b.md`
5. `docs/troubleshooting-guide.md`

## 디렉터리 안내

- `docs/` : 워크북과 운영 문서
- `app/` : 웹, API, 워커 소스
- `stack/` : Docker Stack 배포 파일과 오버라이드 예제
- `configs/` : Docker Config 실습용 파일
- `secrets-example/` : Docker Secret 샘플 값
- `scripts/` : 준비/검증/정리 스크립트
- `sample-data/` : 초기 데이터 샘플

## 핵심 실습 포인트

- `docker stack deploy` 와 `docker stack rm`
- `docker service ls`, `docker service ps`, `docker service scale`
- rolling update 와 rollback
- node `drain` / `active`
- placement constraints / preferences
- Docker Config / Secret 교체 절차
- Traefik 라우팅과 Swarm overlay network 확인

## 공식 동작 기준

본 워크북은 Docker 공식 문서의 다음 동작 원칙을 반영합니다.

- `docker stack` / `docker service` 관련 조작은 **manager 노드에서 수행** [Docker Docs](https://docs.docker.com/engine/swarm/stack-deploy/)
- `docker stack deploy` 는 **legacy Compose v3 계열 형식** 기준으로 작성 [Docker Docs](https://docs.docker.com/engine/swarm/stack-deploy/)
- 서비스 운영은 **scaling / rolling update / rollback / placement constraints / preferences** 개념을 중심으로 구성 [Docker Docs](https://docs.docker.com/engine/swarm/services/)
- `drain` 전환 시 해당 노드의 swarm task 는 종료되고 active 노드로 재배치됨 [Docker Docs](https://docs.docker.com/engine/swarm/swarm-tutorial/drain-node/)
- Traefik Swarm provider 사용 시 라벨은 **서비스의 `deploy.labels`** 에 두고, 백엔드 포트는 명시적으로 지정 [Traefik Docs](https://doc.traefik.io/traefik/reference/install-configuration/providers/swarm/)
- Secret 은 민감값, Config 는 비민감 설정값 관리에 적합 [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/) [Docker Configs](https://docs.docker.com/engine/swarm/configs/)

## 주의 사항

- 이 패키지의 `secrets-example/` 값은 **학습용 샘플**입니다.
- 운영 환경에서는 반드시 별도 비밀값을 생성하세요.
- MariaDB 는 실습 단순화를 위해 단일 replica 입니다.
- Traefik 은 Docker API 접근 특성상 manager 배치를 기본값으로 둡니다.

## 파일 열기

- Markdown 선호: `.md`
- 브라우저 보기 선호: `.html`

행운을 빕니다. 이 패키지의 목표는 단순 배포가 아니라, **배포 후 운영자가 무엇을 보고 어떤 명령으로 통제하는지**까지 익히는 것입니다.
