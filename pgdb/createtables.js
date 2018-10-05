import db from './dbconfig';

const queryText =
    `CREATE TABLE IF NOT EXISTS
      users (
        count SERIAL PRIMARY KEY,
        firstname VARCHAR(20) NOT NULL,
        surname VARCHAR(20) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        username VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL,
        userid UUID NOT NULL
      )`;

db.query(queryText, (error)=>{
	if (error) {
		console.log(error);
	}
});

const queryTextOrdersSummary =
    `CREATE TABLE IF NOT EXISTS
      ordersummary (
        id SERIAL PRIMARY KEY,
        orderid UUID NOT NULL,
        userid UUID NOT NULL,
        price INTEGER NOT NULL
      )`;

db.query(queryTextOrdersSummary, (error)=>{
  if (error) {
    console.log(error);
  }
});

const queryTextOrders =
    `CREATE TABLE IF NOT EXISTS
      orders (
        id SERIAL PRIMARY KEY,
        orderid UUID NOT NULL,
        foodid UUID NOT NULL,
        quantity VARCHAR(5) NOT NULL,
        status VARCHAR(20) NOT NULL,
        userid UUID NOT NULL
      )`;

db.query(queryTextOrders, (error)=>{
  if (error) {
    console.log(error);
  }
});

const queryTextMessages =
    `CREATE TABLE IF NOT EXISTS
      messages (
        id SERIAL PRIMARY KEY,
        sender VARCHAR(20) NOT NULL,
        receiver VARCHAR(20) NOT NULL,
        message TEXT NOT NULL
        
      )`;

db.query(queryTextMessages, (error)=>{
  if (error) {
    console.log(error);
  }
});

const queryTextMenu =
    `CREATE TABLE IF NOT EXISTS
      menu (
        id SERIAL,
        foodid UUID PRIMARY KEY NOT NULL,
        foodname VARCHAR(20) NOT NULL,
        foodprice INTEGER NOT NULL,
        fooddescription TEXT NOT NULL        
      )`;

db.query(queryTextMenu, (error)=>{
  if (error) {
    console.log(error);
  }
});