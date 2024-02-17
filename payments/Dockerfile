FROM node:alpine

WORKDIR /app
COPY package.json .
COPY .npmrc .

RUN --mount=type=secret,target=.npmrc npm install --omit=dev
COPY . .

CMD ["npm", "start"]