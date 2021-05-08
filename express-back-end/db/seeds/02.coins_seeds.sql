DROP TABLE IF EXISTS coins CASCADE;

CREATE TABLE coins (
    id SERIAL PRIMARY KEY NOT NULL,
   transaction INT NOT NULL,
  created_date DATE NOT NULL DEFAULT NOW() ,
  user_id  INTEGER REFERENCES users(id) ON DELETE CASCADE
);