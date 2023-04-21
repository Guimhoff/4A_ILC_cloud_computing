docker stop piouteur-redis
docker stop piouteur-api
docker stop piouteur-front
docker rm piouteur-redis
docker rm piouteur-api
docker rm piouteur-front
docker run --name piouteur-redis -p 6379:6379 -d redis
cd ./backend
docker build -t piouteur-api .
docker run --name piouteur-api -p 5001:5001 -d piouteur-api
cd ../frontend
docker build -t piouteur-front .
docker run --name piouteur-front -p 80:80 -d piouteur-front
cd ..