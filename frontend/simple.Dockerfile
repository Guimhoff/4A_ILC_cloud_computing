# Production
FROM nginx

# copie des fichiers de production générés
COPY /public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
