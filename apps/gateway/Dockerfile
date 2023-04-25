# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT} as builder

WORKDIR /usr/builder

COPY ../.. .

RUN npm install

RUN npm run build gateway 

FROM node:alpine As development

WORKDIR /usr/src/app

COPY --from=builder /usr/builder/dist/apps/gateway .

RUN npm install

RUN npm install --save-dev nestjs-zod-prisma --legacy-peer-deps

RUN npx prisma generate
# RUN npx prisma studio 

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY --from=development /usr/src/app/dist/prisma ./dist/prisma


CMD ["node", "dist/apps/gateway/main"]
