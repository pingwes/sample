CREATE TABLE "public"."note" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "content" text NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "title" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
