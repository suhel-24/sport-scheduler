-- CreateTable
CREATE TABLE "gamePlayers" (
    "GameId" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "teamName" VARCHAR(255),

    CONSTRAINT "gamePlayers_pkey" PRIMARY KEY ("GameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "gamePlayers_GameId_player_id_key" ON "gamePlayers"("GameId", "player_id");

-- AddForeignKey
ALTER TABLE "gamePlayers" ADD CONSTRAINT "gamePlayers_GameId_fkey" FOREIGN KEY ("GameId") REFERENCES "games"("gameId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gamePlayers" ADD CONSTRAINT "gamePlayers_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
