let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQLRoot",
    database: "todolist"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS todolist", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    // let sql = "CREATE TABLE IF not exists todolist (id varchar(255) PRIMARY KEY , title VARCHAR(255), dateBegin DATE , dateEnd DATE, statut VARCHAR(255), tags VARCHAR(255))";
    let sql = "CREATE TABLE IF not exists todolist (id varchar(255) PRIMARY KEY , title VARCHAR(255), dateBegin VARCHAR(10), dateEnd VARCHAR(10), statut VARCHAR(255), tags VARCHAR(255))";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
module.exports=con;