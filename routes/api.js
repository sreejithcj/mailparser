var express = require('express');
var router = express.Router();
var dbProjects = require('../api/dbUtilForProjects');
var dbCustomers = require('../api/dbUtilForCustomers');

/*router.get('/getAllLocations', db.getAllLocations);
router.post('/saveLocation', db.saveLocation);*/


//Project Operatios
router.get('/getProject/:id', dbProjects.getProject);
router.get('/getAllProjects', dbProjects.getAllProjects);
router.post('/saveProject', dbProjects.saveProject);
router.post('/updateProject', dbProjects.updateProject);
router.get('/deleteProject/:id', dbProjects.deleteProject);
//Customer Operations
router.get('/getCustomer/:id', dbCustomers.getCustomer);
router.get('/getAllCustomers', dbCustomers.getAllCustomers);
router.post('/saveCustomer', dbCustomers.saveCustomer);
router.post('/updateCustomer', dbCustomers.updateCustomer);
router.get('/deleteCustomer/:id', dbCustomers.deleteCustomer);


module.exports = router;