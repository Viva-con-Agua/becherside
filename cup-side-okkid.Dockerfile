FROM node as build-stage
ENV site okkid

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)

COPY ./cupsite/. .
COPY ./sides/${site}/index.md ./src/_content/index.md
COPY ./sides/${site}/footer.md ./src/_content/footer.md

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)

# build app for production with minification
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/okkid/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
