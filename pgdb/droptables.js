import db from './dbconfig';

//db.query('DROP TABLE IF EXISTS reflections')

const queryText =
    `DROP TABLE IF EXISTS users`;

db.query(queryText, (error)=>{
	if (error) {
		console.log(error);
	}
})