docker stop piouteur-redis
docker stop piouteur-api
docker stop piouteur-front
docker rm piouteur-redis
docker rm piouteur-api
docker rm piouteur-front
docker run --name piouteur-redis -p 6379:6379 -d redis
Set-Location ./backend
docker build -t piouteur-api .
docker run --name piouteur-api -p 5000:5000 -d piouteur-api
Set-Location ../frontend
docker build -t piouteur-front .
docker run --name piouteur-front -p 80:80 -d piouteur-front
curl.exe -X POST http://localhost:5000/demo
cd ..