const con = require('./connection');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); //parse data into JSON format.

app.use(express.static(__dirname)); // server css as static

app.use(bodyParser.urlencoded({extended:true})); // get our app to use body parser 

// app.get("/", function(req,res){
//     res.sendFile(__dirname + '/index.html');
// });
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// app.post('/',function(req,res){
app.post('/', (req, res) => {
    // console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let address = req.body.address;
    let orders = req.body.orders;

    //If you using the node-mysql module, just remove the .connect and .end. 
    // Just solved the problem myself. Apparently they pushed in unnecessary code 
    // in their last iteration that is also bugged. You don't need to connect if you
    //  have already ran the createConnection call
    //                     | 
    //                    |   
    //                   |   
    //                  \/   
    
    // con.connect(function(err){ 
    // con.connect((err) => {    
    //      if(err) throw err;
        // let sql = "INSERT INTO orders (name,email,phno,address,orders) VALUES(?,?,?,?,?)";
        let sql = "INSERT INTO orders(name,email,phone,address,orders) VALUES(?,?,?,?,?)";
        con.query(sql, [name,email,phone,address,orders], (err,result) => {
            if(err) throw err;
            // console.log("result:"+result.insertId);
            // res.send("Success"+result.insertId)
            res.sendFile(__dirname + "/success.html");
        // })
    })
})

// app.listen(5501);
app.listen(7000);