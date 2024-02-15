-- CreateTable
CREATE TABLE "sports" (
    "sportid" SERIAL NOT NULL,
    "sname" VARCHAR(255),
    "sdesc" TEXT,
    "maxplayers" INTEGER,
    "created_by" INTEGER,

    CONSTRAINT "sports_pkey" PRIMARY KEY ("sportid")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashedpassword" VARCHAR(255),
    "role" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "games" (
    "gameId" SERIAL NOT NULL,
    "sportId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" VARCHAR(255) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "name_unique" ON "sports"("sname");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sports" ADD CONSTRAINT "sports_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sports"("sportid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
