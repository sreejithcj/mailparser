var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:pearljam@localhost:5432/timesheet';
var db = pgp(connectionString);

function getAllLocations(req, res) {
  console.log('before DB query');
  db.any('select * from mst_location')
    .then(function (data) {
      console.log('Returning the result....' + data);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved All locations'
        });
    });
}

function saveLocation(req, res) {
  console.log('Start saving the location ' + req.body);
  db.none('insert into mst_location(id, location)' +
      'values(${id}, ${location})',
      req.body)
    .then(function () {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          message: 'Saved Location successfully'
        });
    })
    .catch(function (err) {
      // return next(err);
    });
}

///Projects Operation

function getAllProjects(req, res) {
  console.log('before DB query');
  db.any('select * from mst_projects')
    .then(function (data) {
      console.log('Returning the result....' + data);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved All projects'
        });
    });
}

function getProject(req, res) {
  // var query = require('url').parse(req.url,true).query;
  var idVal = extractId(req.url);

  console.log('Start getting the project details for  ' + req.url + '   ' + idVal);
  db.one("select * from mst_projects where id='" + idVal + "'")
    .then(function (data) {
      console.log('Returning the result....' + data);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved All projects'
        });
    });
}

function deleteProject(req, res) {
  let idVal = req.url.replace('/deleteProject/', '').replace('/', '');
  console.log('Start deleting the project details for  ' + req.url + '   ' + idVal);
  db.result('delete from mst_projects where id = $1', idVal)
    .then(function (data) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200)
        .json({
          status: 'success',
          message: 'Deleted project successfully'
        });
    });
}


function saveProject(req, res) {
  console.log('Start saving the project ' + req.body);

  db.none('insert into mst_projects (project_name, mst_customer_id, mst_business_unit_id, po_ref_no, value , mst_currency_id,mst_employee_id_project_owner, mst_employee_id_account_owner,mst_project_status_id)' +
      ' values(${project_name},${mst_customer_id}, ${mst_business_unit_id},${po_ref_no},${value},${mst_currency_id},${mst_employee_id_project_owner}, ${mst_employee_id_account_owner},${mst_project_status_id})',
      req.body)
    .then(function () {
      res.setHeader('Access-Control-Allow-Origin: *');
      res.setHeader('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
      console.log('Save project successfull');
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.status(200)
        .json({
          status: 'success',
          message: 'Saved project successfully'
        });
    })
    .catch(function (err) {
      // return next(err);
    });
}

function updateProject(req, res) {
  console.log('Start updating the project ' + req.body);

  /*db.none("update mst_projects set project_name, mst_customer_id, mst_business_unit_id, po_ref_no, value , mst_currency_id,mst_employee_id_project_owner, mst_employee_id_account_owner,mst_project_status_id)" +
      " values(${project_name},${mst_customer_id}, ${mst_business_unit_id},${po_ref_no},${value},${mst_currency_id},${mst_employee_id_project_owner}, ${mst_employee_id_account_owner},${mst_project_status_id}) where id='${id}'",
      req.body)
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
*/

  db.none('update mst_projects set project_name=$1, mst_customer_id=$2, mst_business_unit_id=$3, po_ref_no=$4, value=$5 , mst_currency_id=$6,mst_employee_id_project_owner=$7, mst_employee_id_account_owner=$8,mst_project_status_id=$9 where id=$10', [req.body.project_name, req.body.mst_customer_id, req.body.mst_business_unit_id, req.body.po_ref_no, req.body.value, req.body.mst_currency_id, req.body.mst_employee_id_project_owner, req.body.mst_employee_id_account_owner, req.body.mst_project_status_id, parseInt(req.body.id)]).then(function () {
      res.setHeader('Access-Control-Allow-Origin: *');
      res.setHeader('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
      console.log('update  project successfull');
      //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated project successfully'
        });
    })
    .catch(function (err) {
      // return next(err);
    });
}


function extractId(reqUrl) {
  console.log('reqUrl : ' + reqUrl);
  let extractedId = reqUrl.replace('/getProject/', '').replace('/', '');
  console.log(extractedId);
  return parseInt(extractedId);
}


module.exports = {
  getProject: getProject,
  getAllProjects: getAllProjects,
  saveProject: saveProject,
  deleteProject: deleteProject,
  updateProject: updateProject,
  getAllLocations: getAllLocations,
  saveLocation: saveLocation
};