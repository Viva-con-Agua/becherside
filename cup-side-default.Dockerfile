FROM node as build-stage

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)

COPY . .
# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)

# build app for production with minification
RUN npm run build

FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
