//import express
const express = require("express");
//import routes
const routes = require("./routes");
//import sequelize
const sequelize = require("./config/connection");

//set up port
const app = express();
const PORT = process.env.PORT || 3001;

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//turn on routes
//my note: because of the way routes were set up in routes/index.js we don't need to import a bunch of different routes, everything is collected and packaged from that one file and imported here
app.use(routes);

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
//my note during lesson 1: importing Sequelize at the top of file from config/connection.js then here use `sequelize.sync()` method to establish the connection to the database. The `sync` part means that this is Sequelize taking the models and connecting them to associated database tables, if it doesn't find a table, it'll create one.
//notice 'force:false', if force were set to true, it will drop and re-create all databases tables on start-up.
