FROM node:6
EXPOSE 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app/.
RUN npm install
COPY . /usr/src/app

ENV env development

CMD ["npm", "run", "start"]
