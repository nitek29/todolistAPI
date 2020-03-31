let uuid = require("uuid");
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

module.exports={


    add: function(myjson){
        console.log("add");
        const tache = JSON.parse(myjson);
        tache["id"]=uuid.v4();
        let sql="INSERT INTO todolist set ?";
        con.query(sql,tache,function (err,result) {
            if (err) throw err;
            console.log("Insert ok")
        })
        return tache
    },
    getAll: function(params){
        console.log("get all");
      return new Promise(((resolve, reject) => {
          let sql;
          console.log(params)
          if (Object.keys(params).length>0){
              sql= "SELECT * FROM todolist WHERE";
              Object.entries(params).forEach(([k,v]) =>{
                  sql+=" ("+k+" = '"+v.join("' OR "+k+" = '");
                  sql+="') AND";
              })
              let lastAnd= sql.lastIndexOf(" ");
              sql=sql.substring(0,lastAnd);
          }else{
              sql= "SELECT * FROM todolist";
          }
          let query=con.query(sql,params,function (err,result) {
              if (err) {
                  throw err;
                  reject("identifiant inconnu");
              }else{
                  resolve(JSON.parse(JSON.stringify(result)));
              }
          })
          console.log(query.sql);
      }))

    },

    get: function (id,list) {
        console.log("get by id")
        return new Promise((resolve,reject)=>{
            let sql =" SELECT * FROM todolist where id = ?";
            con.query(sql,id,function (err,result) {
                if (err) {
                    throw err;
                    reject("identifiant inconnu");
                }else{
                    console.log("get ok");
                    console.log(result);
                    resolve(result);
                }
            })
            /*list.forEach(e => {
                if (e.id == id) {
                    resolve(e);
                }else{
                    reject("identifiant inconnu");
                }
            })*/
        })
    },
    update: function(id,list,myjson) {
        console.log("update");
        console.log(JSON.parse(myjson))
        return new Promise((resolve, reject) => {
                let sql = "UPDATE todolist SET ? WHERE id =?";
                let data = [JSON.parse(myjson), id]
                con.query(sql, data, function (err, result) {
                    if (err) {
                        throw err;
                        reject("identifiant inconnu");
                    }else{
                        console.log("update ok");
                        console.log(result);
                        resolve(result);
                    }
                })

            /*if (list.length>0) {
                list.forEach(e => {
                    if (e.id == id) {
                        list[list.indexOf(e)] = JSON.parse(myjson);
                        console.log(e);
                        resolve(e);
                    } else {
                        reject("identifiant inconnu");
                    }
                })
            }else{
                reject("Aucune tâche n'existe")
            }*/

        })
    },
    delete: function (id,list) {
        console.log("delete");
        return new Promise((resolve, reject) => {
            let sql="DELETE FROM todolist WHERE id = ?";
            con.query(sql, id, function (err, result) {
                if (err) {
                    throw err;
                    reject("identifiant inconnu");
                }else{
                    console.log("delete ok");
                    console.log(result);
                    resolve(JSON.stringify(result));
                }
            })
           /* list.forEach(e => {
                if (e.id == id) {
                    console.log(e)
                    list.splice(list.indexOf(e),1)
                    resolve(list);
                } else {
                    reject("identifiant inconnu");
                }
            })*/
        })


    }
}