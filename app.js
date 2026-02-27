require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const port = 4002
const DatabaseConnection = require('./app/config/dbcon');


// console.log(path);

const app = express()

DatabaseConnection()

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const productsApiRoute = require("./app/routes/productApiRoute");
app.use("/api/v1", productsApiRoute);


app.listen(port, ()=>{
    console.log("server is running in this port", port);

});
