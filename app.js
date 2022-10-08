//var popup = require('popups');
const express = require("express");
const app = express();
var bodyParser = require('body-parser'); 
const router = express.Router();
const mysql = require("mysql");
var path = require('path');
const db = mysql.createPool({
	host     : "127.0.0.1",
	user     : "root",
	password : "Kudda@14",
	database : "UserBase",
});
//app.use(express.json());
//app.get('/', (request,response)=>{
  // response.send("hello world!");

//});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
app.get('/style.css',function(req,res){
	res.sendFile(__dirname+"/"+"style.css")
})
router.get('/', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'index.html';
    res.sendFile(fileName, options);	
});
router.get('/register', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'register.html';
    res.sendFile(fileName, options);
});
router.get('/registerError', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'registerError.html';
    res.sendFile(fileName, options);
});
router.get('/login', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'login.html';
    res.sendFile(fileName, options);
});
router.get('/loginError', function(req, res){
    
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'loginError.html';
    res.sendFile(fileName, options);
});
router.get('/createUser', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'home.html';
    res.sendFile(fileName, options);
});
app.post("/register",urlencodedParser,function (req,res) {
   let user = req.body.username;
   let password = req.body.password;
    console.log('Connected to MySQL Server!');
    //const sqlInsert = "INSERT INTO users VALUES (?,?,12)"
    //const insert_query = mysql.format(sqlInsert,[user, password,12])
        db.getConnection((err, connection) => {
            if(err) {
                console.log(err.message); 
            }
                   console.log('Connected to MySQL Server!');
                   let insertQuery = 'INSERT INTO users (username,password) VALUES (?,?)';
                   let query = mysql.format(insertQuery,[user,password]);
            
        db.query(query,(err, results) => {
          
            if(err) {
                console.log(err.message); 
                console.log('account exists');
                res.redirect('/registerError')
                return;
            }
             else{
                console.log('welcome '+user);
                res.redirect('/createUser');
             }
            
            
        });
    });
   
});

app.post("/login",urlencodedParser,function (req,res) {
    let user = req.body.username;
    let password = req.body.password;
    
     //const sqlInsert = "INSERT INTO users VALUES (?,?,12)"
     //const insert_query = mysql.format(sqlInsert,[user, password,12])
         db.getConnection((err, connection) => {
         if(err) {
            console.log(err.message); 
        } 
        console.log('Connected to MySQL Server!');
         let insertQuery = 'SELECT*FROM users WHERE username = ? AND password = ?';
         let query = mysql.format(insertQuery,[user,password]);
             db.query(query, (err,results)=>{
           
             if(err) {
                 console.log(err.message);
             }
             if(results.length>0){
                console.log('user found, hello '+user);
                res.redirect('/createUser');
             }
             else if(results.length<=0){
                    console.log('user not available');
                    //alert("failed","User doesnt exist,pleale register");
                    res.redirect('/loginError');
             }
		    });
             // rows added
         });   
             console.log(res.insertId);
             
     });

app.use('/', router);
const port  = process.env.PORT || 5000;
app.listen(port,()=> console.log('listening 5000'));


