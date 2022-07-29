DROP TABLE IF EXISTS owner, pets;

CREATE TABLE owner (
    id SERIAL PRIMARY KEY,
    name TEXT,
    address TEXT,
    phone_number TEXT,
    married BOOLEAN NOT NULL
);

CREATE TABLE pets (
    id SERIAL,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES owner(id),
    type TEXT,
    name TEXT,
    age INTEGER,
    colors TEXT
);