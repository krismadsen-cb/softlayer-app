FROM node:6
EXPOSE 3000

WORKDIR /srv
ADD . /srv

RUN npm install
ENV env development

CMD ["npm", "run", "start"]
