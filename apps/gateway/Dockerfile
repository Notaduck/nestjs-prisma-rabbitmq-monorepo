FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./libs/prisma/prisma ./prisma/

RUN npm install

RUN npm install --save-dev nestjs-zod-prisma --legacy-peer-deps

RUN npx prisma generate
# RUN npx prisma studio 

COPY . .

RUN npm run build gateway 

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=development /usr/src/app/dist/prisma ./dist/prisma


CMD ["node", "dist/apps/gateway/main"]