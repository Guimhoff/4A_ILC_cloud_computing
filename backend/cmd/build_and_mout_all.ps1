docker run --name piouteur-redis -p 6379:6379 -d redis
docker build -t piouteur-api .
docker run --name piouteur-api -p 5000:5000 -d piouteur-api