
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
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
  console.log(req.params.id);
  let id = req.params.id;
  var query = 'EXEC EmployeeById ' + Number(id);
  executeQuery(res, query);
})



app.get('/leave/types', async function (req, res) {
  var query = 'EXEC TypesOfLeaves' ;
  executeQuery (res, query);
})

app.get('/employee/project/:id', async function (req, res) {

  console.log(req.params.id);
  let id = req.params.id;
  var query = 'EXEC ProjectByEmployeeId ' + id;
  executeQuery (res, query);

})


app.get('/employee/leave/:id', async function (req, res) {

  console.log(req.params.id);
  let id = req.params.id;
  var query = 'EXEC EmployeeSeeLeaveSummary ' + id ;
  executeQuery (res, query);

})

app.get('/employee/leaveLog/:id', async function (req, res) {


  console.log(req.params.id);
  let id = req.params.id;

  var query = 'EXEC EmployeeSeeLeaveRequestsLog ' + id ;
  executeQuery (res, query);
})

app.get('/employee/ReviewleaveLog/:id', async function (req, res) {
  console.log(req.params.id);
  let id = req.params.id;
  var query = 'EXEC ReviewerSeeLeaveRequest ' + id ;
  executeQuery (res, query);
})

app.post('/employee/Reviewleave', async function (req, res) {

  console.log(req.body);

  var query = 'EXEC ReviewLeaveRequest ' + req.body.RequestId +','+ req.body.ReviewerId +', \''+ req.body.Reason +'\',\''+ req.body.Status +'\' ;' ;
  executeQuery (res, query);
})

app.get('/employee/CM/:id', async function (req, res) {

  console.log(req.params.id);
  let id = req.params.id;
  var query = 'EXEC getCMOfEmployee ' + id;
  executeQuery (res, query);

})

app.post('/employee/leave/Request', async function (req, res) {

  console.log(req.body);
  console.log('EXEC InsertLeaveRequest ' + req.body.Id +', \''+ req.body.Type +'\', \''+ req.body.LeaveFrom +'\',\''+ req.body.LeaveTo +'\',\''+ req.body.Reason +'\' ;');

  var query = 'EXEC InsertLeaveRequest ' + req.body.Id +', \''+ req.body.Type +'\', \''+ req.body.LeaveFrom +'\',\''+ req.body.LeaveTo +'\',\''+ req.body.Reason +'\' ;' ;
  executeQuery (res, query);
})


app.post('/login', async function(req, res){

  console.log("login api");

  sql.connect(sqlConfig, function() {
    var request = new sql.Request();
    request.query('EXEC verifyLogin \'' + req.body.username + '\', \'' + req.body.password +'\' ;' , function(err, recordset) {
      if(err){
        console.log(err);
        sql.close();
      }
      let result = recordset.recordset;
      console.log(result);
      // if(result[0].id != 0){
      //   var token = jwt.sign({id:result[0].id}, 'leave');
      //   localStorage.setItem('token', token);
      // }
      res.send(recordset.recordset);
      sql.close();
    });
  });

})

app.post('/test', async function(req,res){
  // console.log("gotchaa");
  res.send(req.body.name);
})

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});
