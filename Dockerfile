FROM node:16 as dependencies
WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16 as builder
WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules

ARG NEXT_PUBLIC_NHOST_SUBDOMAIN
ARG NEXT_PUBLIC_NHOST_REGION
ARG NEXT_PUBLIC_HASURA_URL
ARG HASURA_ADMIN_SECRET
ARG JWT_SECRET

RUN yarn run build

FROM node:16 as runner
WORKDIR /my-project
ENV NODE_ENV production
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
