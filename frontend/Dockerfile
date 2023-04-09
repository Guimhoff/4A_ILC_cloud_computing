
# compilation des pages
FROM node AS build


WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN yarn install

# copie du code source
COPY /src/ ./src/
COPY gatsby-browser.js .
COPY gatsby-config.js .

# génération des fichiers de production
RUN yarn build

# Production
FROM nginx

# copie des fichiers de production générés
COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
