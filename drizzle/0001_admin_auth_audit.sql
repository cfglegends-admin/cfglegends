CREATE TABLE "admin_users" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" varchar(255) NOT NULL,
  "password_hash" text NOT NULL,
  "is_master" boolean DEFAULT false NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX "admin_users_email_unique" ON "admin_users" USING btree ("email");

CREATE TABLE "admin_audit_logs" (
  "id" serial PRIMARY KEY NOT NULL,
  "admin_user_id" integer NOT NULL,
  "entity_type" varchar(50) NOT NULL,
  "entity_id" varchar(100),
  "action" varchar(30) NOT NULL,
  "summary" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "admin_audit_logs"
ADD CONSTRAINT "admin_audit_logs_admin_user_id_admin_users_id_fk"
FOREIGN KEY ("admin_user_id")
REFERENCES "public"."admin_users"("id")
ON DELETE cascade
ON UPDATE no action;
