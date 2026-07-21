const mysql = require("mysql2");


const connection = mysql.createConnection({

    host:"localhost",

    user:"root",

    password:"root@1234",

    database:"userdb"

});


connection.connect(function(error){


    if(error){

        console.log(error);
        console.log("Database connection failed");

    }

    else{

        console.log("Database connected successfully");

    }


});


module.exports = connection;