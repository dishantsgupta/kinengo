const express = require("express");
const route = express.Router();
const { checkToken } = require("../../auth/token_validation.auth");



// user controller access
const UserController = require("../controllers/user.controller");
 


// create a new user route
route.post('/register', UserController.createNewRecordCon);

// verification route
route.post('/verification', UserController.verificationCon);

// login route
route.post(`/login`, UserController.loginUserCon);

// forget password route
route.post(`/forget-password`, UserController.forgetPassCon);
// route.post(`/forget-password`, checkToken, UserController.forgetPassCon);

// reset password route
route.post(`/reset-password`, UserController.resetPassCon);

// change password route
route.put(`/change-password/:id`, checkToken, UserController.changePassCon);

// profile show route
route.get(`/edit-profile/:id`, checkToken, UserController.profileShowCon);

// profile update route
route.post(`/edit-profile/:id`, checkToken, UserController.profileUpdateCon);

// delete account route
route.post(`/delete-account/:id`, checkToken, UserController.deleteAccountCon);




module.exports = route;