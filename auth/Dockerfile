FROM node:alpine

WORKDIR /app
COPY package.json .
COPY .npmrc .

RUN --mount=type=secret,id=npmrc,target=.npmrc npm install --omit=dev
COPY . .

CMD ["npm", "start"]