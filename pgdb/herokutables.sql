    CREATE TABLE IF NOT EXISTS
      users (
        count SERIAL PRIMARY KEY,
        firstname VARCHAR(20) NOT NULL,
        surname VARCHAR(20) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        username VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL,
        userid UUID NOT NULL
      );
