docker stop piouteur-redis
docker rm piouteur-redis
docker run --name piouteur-redis -p 6379:6379 -d redis