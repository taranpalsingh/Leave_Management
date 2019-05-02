
console.log("Starting Index JS");
const PORT = 3333;

const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

var sqlConfig = {
  user: 'Taran',
  password: 'P@ssword123',
  server: 'CYG225',
  database: 'Leave_Management'
}
var executeQuery = function(res, query){
  new sql.ConnectionPool(sqlConfig).connect().then(pool => {
      return pool.request().query(query)
  }).then(result => {
      let rows = result.recordset;
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.status(200).json(rows);
      sql.close();
  }).catch(err => {
      res.status(500).send({ message: err })
      sql.close();
  });
}


app.get('/employee/:id', async function (req, res) {
  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    let id = req.params.id;
    var query = 'EXEC EmployeeById ' + Number(id);
    executeQuery(res, query);
  }

  else {
    res.send("Not authorized");
  }
})

app.get('/leave/types', async function (req, res) {
  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    var query = 'EXEC TypesOfLeaves' ;
    executeQuery (res, query);
  }

  else {
    res.send("Not authorized");
  }
})

app.get('/employee/project/:id', async function (req, res) {
  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    let id = req.params.id;
    var query = 'EXEC ProjectByEmployeeId ' + id;
    executeQuery (res, query);
  }
  else {
    res.send("Not authorized");
  }
})

app.get('/employee/leave/:id', async function (req, res) {
  let id = req.params.id;
  var query = 'EXEC EmployeeSeeLeaveSummary ' + id ;
  executeQuery (res, query);
})

app.get('/employee/leaveLog/:id', async function (req, res) {
  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    let id = req.params.id;
    var query = 'EXEC EmployeeSeeLeaveRequestsLog ' + id ;
    executeQuery (res, query);
  }
  else {
    res.send("Not authorized");
  }
})

app.get('/employee/ReviewleaveLog/:id', async function (req, res) {
  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    let id = req.params.id;
    var query = 'EXEC ReviewerSeeLeaveRequest ' + id ;
    executeQuery (res, query);
  }
  else {
    res.send("Not authorized");
  }
})

app.post('/employee/Reviewleave', async function (req, res) {

  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    var query = 'EXEC ReviewLeaveRequest ' + req.body.RequestId +','+ req.body.ReviewerId +', \''+ req.body.Reason +'\',\''+ req.body.Status +'\' ;' ;
    executeQuery (res, query);
  }
  else {
    res.send("Not authorized");
  }

})

app.get('/employee/CM/:id', async function (req, res) {

  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    let id = req.params.id;
    var query = 'EXEC getCMOfEmployee ' + id;
    executeQuery (res, query);
  }
  else {
    res.send("Not authorized");
  }
})

app.post('/employee/leave/Request', async function (req, res) {
  let token = req.headers.authorization;
  let auth = await tokenCheck(token);
  if(auth === "Authorized"){
    var query = 'EXEC InsertLeaveRequest ' + req.body.Id +', \''+ req.body.Type +'\', \''+ req.body.LeaveFrom +'\',\''+ req.body.LeaveTo +'\',\''+ req.body.Reason +'\' ;' ;
    executeQuery (res, query);
  }
  else {
    res.send("Not authorized");
  }
})

app.post('/login', async function(req, res){

  console.log("login api");
  sql.connect(sqlConfig, function() {
    var request = new sql.Request();
    request.query('EXEC verifyLogin \'' + req.body.username + '\', \'' + req.body.password +'\' ;' , function(err, recordset) {
      if(err){
        sql.close();
      }
      let result = recordset.recordset;
      if(result[0].id != 0){   // id = 0, when the user does not exists, from database
        let t = {};
        if(result[0].isCM == "1"){
          t = {
              id:result[0].id,
              role: "CM"
          }
        }
        else if(result[0].isCM == "0"){
          t = {
              id:result[0].id,
              role: "employee"
          }
        }
        var token = jwt.sign(t, 'leave_123');
        let myObj = {
          token: token,
          id: result[0].id,
          isCM: result[0].isCM
        }
        res.send(myObj);
      }
      else
        res.send(0);
      sql.close();
    });
  });
})

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function tokenCheck(token){
  let payload = jwt.verify(token, 'leave_123');
  console.log("inside tokencheck");
  if((payload.role === "employee") || (payload.role === "CM")){
    return "Authorized";
  }
  else
    return 0;
}
