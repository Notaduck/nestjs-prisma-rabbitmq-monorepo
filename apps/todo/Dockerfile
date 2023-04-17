FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./libs/prisma/prisma ./prisma/

RUN npm install

RUN npm install --save-dev nestjs-zod-prisma --legacy-peer-deps

RUN npx prisma generate
RUN npm run seed
RUN npm run studio

COPY . .

RUN npm run build todo

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install --only=production
# COPY --from=development /usr/src/app/dist/prisma ./dist/prisma
COPY --from=development /usr/src/app/dist ./dist


CMD ["node", "dist/apps/todo/main"]