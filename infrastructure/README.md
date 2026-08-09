# Infrastructure

## Prerequisite
- Docker Desktop

## Start
```bash
cd infrastructure
docker compose up -d
```

## Status
```bash
docker compose ps
```

## Logs
```bash
docker compose logs sqlserver
```

## Stop
```bash
docker compose stop
```

## Start existing
```bash
docker compose start
```

## Remove container/network but preserve named volume
```bash
docker compose down
```

> **CẢNH BÁO:**
> Lệnh `docker compose down -v` sẽ xóa named volume/database data. 
> Không khuyến khích chạy lệnh đó trừ khi cố ý reset database.

## Database Target
- **Database**: HomeStoreDb
- **Host**: localhost
- **Port**: 1433
