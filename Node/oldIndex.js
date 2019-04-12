console.log("Starting Index JS");
const PORT = 3333;

const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// app.get('/test', async function (req, res) {
//   res.send({Response: "Reached"});
// })


var sqlConfig = {
  user: 'Taran',
  password: 'P@ssword123',
  server: 'CYG225',
  database: 'Leave_Management'
}

app.get('/employee/:id', async function (req, res) {

  console.log(req.params.id);
  let id = req.params.id;
    sql.connect(sqlConfig, function() {

        var request = new sql.Request();
        request.query('EXEC EmployeeById ' + Number(id) , function(err, recordset) {
            if(err){
              res.send("Error");
              sql.close();
              console.log(err);
            }

            res.send(recordset.recordset);
            sql.close();
        });
    });
})

app.get('/leave/types', async function (req, res) {

    sql.connect(sqlConfig, function() {

        var request = new sql.Request();
        request.query('EXEC TypesOfLeaves' , function(err, recordset) {
            if(err){
              sql.close();
              console.log(err);
            }
            res.send(recordset.recordset);
            sql.close();
        });
    });
})

app.get('/employee/project/:id', async function (req, res) {

  console.log(req.params.id);
  let id = req.params.id;
    sql.connect(sqlConfig, function() {

        var request = new sql.Request();
        request.query('EXEC ProjectByEmployeeId ' + id , function(err, recordset) {
            if(err){
              sql.close();
              console.log(err);
            }
            res.send(recordset.recordset);
            // res.send("OK");
            sql.close();
        });
    });
})


app.get('/employee/leave/:id', async function (req, res) {

  console.log(req.params.id);
  let id = req.params.id;
    sql.connect(sqlConfig, function() {

        var request = new sql.Request();
        request.query('EXEC EmployeeSeeLeaveSummary ' + id , function(err, recordset) {
            if(err){
              sql.close();
              console.log(err);
            }
            res.send(recordset.recordset);
            // res.send("OK");
            sql.close();
        });
    });
})

app.get('/employee/leaveLog/:id', async function (req, res) {


  console.log(req.params.id);
  let id = req.params.id;
    sql.connect(sqlConfig, function() {

        var request = new sql.Request();
        request.query('EXEC EmployeeSeeLeaveRequestsLog ' + id , function(err, recordset) {
            if(err){
              sql.close();
              console.log(err);
            }
            else res.send(recordset.recordset);
            // res.send("OK");
            sql.close();
        });
    });
})

app.get('/employee/CM/:id', async function (req, res) {

  console.log(req.params.id);
  let id = req.params.id;
  sql.connect(sqlConfig, function() {

      var request = new sql.Request();
      request.query('EXEC getCMOfEmployee ' + id , function(err, recordset) {
          if(err){
            sql.close();
            console.log(err);
          }
          res.send(recordset.recordset);
          sql.close();
      });
  });
})

app.post('/employee/leave/Request', async function (req, res) {

  console.log(req.body);
  console.log('EXEC InsertLeaveRequest ' + req.body.Id +', '+ req.body.Type +', \''+ req.body.LeaveFrom +'\',\''+ req.body.LeaveTo +'\',\''+ req.body.Reason +'\' ;');
  sql.connect(sqlConfig, function() {

      var request = new sql.Request();
      request.query('EXEC InsertLeaveRequest ' + req.body.Id +', '+ req.body.Type +', \''+ req.body.LeaveFrom +'\',\''+ req.body.LeaveTo +'\',\''+ req.body.Reason +'\' ;' , function(err, recordset) {
          if(err){
            sql.close();
            console.log(err);
          }
          res.send("Created");
          sql.close();
      });
  });
})

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("app listening at http://%s:%s", host, port);
});
