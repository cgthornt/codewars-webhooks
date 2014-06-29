-- Run this file:
--  sqlite3 db/codewars.sqlite3 < db/setup.sql


CREATE TABLE IF NOT EXISTS "users" (
  id VARCHAR(255) PRIMARY KEY,
  rank INTEGER
);

CREATE INDEX IF NOT EXISTS "rank_index" ON "users"("rank");
