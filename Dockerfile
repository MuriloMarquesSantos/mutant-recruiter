FROM node:16-alpine

WORKDIR /mutant-recruiter

COPY package.json /mutant-recruiter
COPY yarn.lock /mutant-recruiter

RUN yarn
COPY . /mutant-recruiter/ 

RUN yarn build

EXPOSE 3333

CMD yarn start