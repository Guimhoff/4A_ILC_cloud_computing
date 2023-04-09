docker build -t piouteur-front .
docker stop piouteur-front
docker rm piouteur-front
docker run --name piouteur-front -p 80:80 -d piouteur-front