FROM node:12.18.3-alpine3.12
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE 3000
RUN npm run build
# HEALTHCHECK --interval=5s --timeout=3s --start-period=10s --retries=3 \
#     CMD node /app/healthcheck.js;

CMD npm run start