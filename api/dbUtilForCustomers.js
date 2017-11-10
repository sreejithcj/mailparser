var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:pearljam@localhost:5432/timesheet';
var db = pgp(connectionString);

function getAllCustomers(req, res) {
  console.log('before DB query');
  db.any('select * from mst_customers')
    .then(function (data) {
      console.log('Returning the result....' + data);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved All customers'
        });
    });
}

function getCustomer(req, res) {
  // var query = require('url').parse(req.url,true).query;
  var idVal = extractId(req.url);

  console.log('Start getting the customers details for  ' + req.url + '   ' + idVal);
  db.one("select * from mst_customers where id='" + idVal + "'")
    .then(function (data) {
      console.log('Returning the result....' + data);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved All customers'
        });
    });
}

function deleteCustomer(req, res) {
  let idVal = req.url.replace('/deleteCustomer/', '').replace('/', '');
  console.log('Start deleting the customers details for  ' + req.url + '   ' + idVal);
  db.result('delete from mst_customers where id = $1', idVal)
    .then(function (data) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          message: 'Deleted customers successfully'
        });
    });
}


function saveCustomer(req, res) {
  console.log('Start saving the customers ' + req.body.customer_name);

  db.none('insert into mst_customers (customer_name, address, contact_no) values(${customer_name},${address}, ${contact_no})',
      req.body)
    .then(function () {
      res.setHeader('Access-Control-Allow-Origin: *');
      res.setHeader('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
      console.log('Save customers successfull');
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.status(200)
        .json({
          status: 'success',
          message: 'Saved customers successfully'
        });
    })
    .catch(function (err) {
      // return next(err);
    });
}

function updateCustomer(req, res) {
  console.log('Start updating the customers ' + req.body);
  db.none('update mst_customers set customers_name=$1, address=$2, contact_no=$3 where id=$4', [req.body.customers_name, req.body.address, req.body.contact_no, parseInt(req.body.id)]).then(function () {
      res.setHeader('Access-Control-Allow-Origin: *');
      res.setHeader('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
      console.log('update  customer successfull');
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated customersuccessfully'
        });
    })
    .catch(function (err) {
      // return next(err);
    });
}


function extractId(reqUrl) {
  console.log('reqUrl : ' + reqUrl);
  let extractedId = reqUrl.replace('/getCustomer/', '').replace('/', '');
  console.log(extractedId);
  return parseInt(extractedId);
}


module.exports = {
  getCustomer: getCustomer,
  getAllCustomers: getAllCustomers,
  saveCustomer: saveCustomer,
  deleteCustomer: deleteCustomer,
  updateCustomer: updateCustomer
};