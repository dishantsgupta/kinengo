const express = require("express");
const route = express.Router();


// admin controller access
const AdminController = require("../controllers/admin.controller");



// show country route
route.get(`/country`, AdminController.showCountryCon);

// add country route
route.post(`/country`, AdminController.addCountryCon);

// update country route
route.put(`/country/:id`, AdminController.updateCountryCon);

// delete country route
route.delete(`/country/:id`, AdminController.deleteCountryCon);

// show state route
route.get(`/state`, AdminController.showStateCon);

// add state route
route.post(`/state`, AdminController.addStateCon);

// update state route
route.put(`/state/:id`, AdminController.updateStateCon);

// delete state route
route.delete(`/state/:id`, AdminController.deleteStateCon);

// show city route
route.get(`/city`, AdminController.showCityCon);

// add city route
route.post(`/city`, AdminController.addCityCon);

// update city route
route.put(`/city/:id`, AdminController.updateCityCon);

// delete city route
route.delete(`/city/:id`, AdminController.deleteCityCon);


module.exports = route;