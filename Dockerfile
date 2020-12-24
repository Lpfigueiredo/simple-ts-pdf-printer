FROM node:12

WORKDIR /usr/app

COPY . .

# https://github.com/puppeteer/puppeteer/issues/3443
RUN apt-get update && \
  apt-get install -y libgtk2.0-0 libgtk-3-0 libnotify-dev \
  libgconf-2-4 libnss3 libxss1 \
  libasound2 libxtst6 xauth xvfb \
  libgbm-dev

RUN npm install

RUN npm run build

RUN npm prune --production

CMD ["npm", "start"]
