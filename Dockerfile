FROM node:16-alpine

WORKDIR /usr

COPY package.json ./
COPY yarn.lock ./

COPY . .

RUN ls -a
RUN yarn install
RUN yarn build

EXPOSE 3333

CMD yarn start