docker pull postgres:16
docker run -d --name db1 -e POSTGRES_PASSWORD=secret -v /data/pgdata:/var/lib/postgresql/data postgres:16
docker build -t myapiimage .
docker run -p 3000:3000 myapiimage
docker run -d --name db1 -e POSTGRES_PASSWORD=secret -v /data/pgdata:/var/lib/postgresql/data postgres
docker run -d --name db2 -e POSTGRES_PASSWORD=secret -v /data/pgdata_s2:/var/lib/postgresql/data -p 5432:5432 postgres:16
