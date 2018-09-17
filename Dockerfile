FROM node:8.11.0

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

RUN npm install

WORKDIR /honesto
ADD . /honesto

RUN npm rebuild node-sass

EXPOSE 3000

CMD ["npm", "start"]
