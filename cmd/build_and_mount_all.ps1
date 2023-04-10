docker run --name piouteur-redis -p 6379:6379 -d redis
Set-Location ./backend
docker build -t piouteur-api .
docker run --name piouteur-api -p 5000:5000 -d piouteur-api
Set-Location ../frontend
docker build -t piouteur-front .
docker run --name piouteur-front -p 80:80 -d piouteur-front