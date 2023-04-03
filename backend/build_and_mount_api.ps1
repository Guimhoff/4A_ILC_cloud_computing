docker build -t piouteur-api .
docker stop piouteur-api
docker rm piouteur-api
docker run --name piouteur-api -p 5000:5000 -d piouteur-api