import db from './dbconfig';

//db.query('DROP TABLE IF EXISTS reflections')

const queryText =
    `CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(20) NOT NULL,
        surname VARCHAR(20) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        username VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL
      )`;

db.query(queryText, (error)=>{
	if (error) {
		console.log(error);
	}
})
