const UserModal = require("../models/user.model");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr"),
cryptr = new Cryptr('qwe1234');
const { sign } = require("jsonwebtoken");



// registration controller function
const createNewRecordCon = async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const userData = new UserModal(req.body);
    const email = req.body.emailid;
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.json({
            status: 422,
            success: false,
            message: "Please fill all fields."
        });
    }
    else {
        UserModal.createNewUser(userData, email, (err, result) => {
            if (err) {
                res.json({
                    status: 405,
                    success: false,
                    message: err.sqlMessage,
                });
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    message: "Verification OTP and verification link will be sent successfully to your registered email id.",
                    data: result,
                });
            }
        });
    }
};



// registration controller function
const verificationCon = (req, res) => {
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.json({
            status: 422,
            success: false,
            message: "Please fill all fields.",
        });
    }
    else {
        UserModal.verication(req.body.otp, (err, result) => {
            if (err) {
                if (err == 404) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Invalid OTP.",
                    });
                } else {
                    res.json({
                        status: 405,
                        success: false,
                        message: err.sqlMessage,
                    });
                }
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    message: "Registration complete.",
                    data: result,
                });
            }
        });
    }
}



// login controller function
const loginUserCon = (req, res) => {
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.json({
            status: 422,
            success: false,
            message: "Please fill all fields.",
        });
    }
    else {
        UserModal.loginUser(req.body.emailid, (err, result) => {
            if (err) {
                if (err == 404) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Invalid email.",
                    });
                } else {
                    res.json({
                        status: 405,
                        success: false,
                        message: `Database error is : `+err.sqlMessage,
                    });
                }
            }
            else {
                bcrypt.compare(req.body.password, result.password, (error, resu) => {
                    if (error) {
                        res.json({
                            status: 404,
                            success: false,
                            message: "Something went wrong. Try again...",
                        });
                    }
                    else if (resu) {
                        result.password = undefined;
                        const jsonToken = sign({ result: result }, "qwe1234", {
                            expiresIn: "1h"
                        });
                        res.json({
                            status: 200,
                            success: true,
                            message: "Login successfull.",
                            token: jsonToken,
                            userid: cryptr.encrypt(result.userid),
                        });
                    }
                    else {
                        res.json({
                            status: 404,
                            success: false,
                            message: "Invalid password.",
                        });
                    }
                });

            }
        });
    }
};


// forget password controller function
const forgetPassCon = (req, res) => {
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.json({
            status: 422,
            success: false,
            message: "Please fill all fields.",
        });
    }
    else {
        UserModal.forgetPass(req.body.emailid, (err, result) => {
            if (err) {
                if (err == 404) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Invalid email.",
                    });
                } else {
                    res.json({
                        status: 405,
                        success: false,
                        message: err.sqlMessage,
                    });
                }
            }
            else if(!(result=='')){
                res.json({
                    status: 200,
                    success: true,
                    message: "Password reset link will sent successfully to your registered email id.",
                    data: result,
                });
            }
            else{
                res.json({
                    status: 404,
                    success: false,
                    message: "Invalid email.",
                });
            }
        });
    }
};



// reset password controller function
const resetPassCon = async (req, res) => {
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.json({
            status: 422,
            success: false,
            message: "Please fill all fields.",
        });
    }
    else {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        UserModal.resetPass(req.body.otp, req.body.password, (err, result) => {
            if (err) {
                if (err == 404) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Invalid OTP.",
                    });
                } else {
                    res.json({
                        status: 405,
                        success: false,
                        message: err.sqlMessage,
                    });
                }
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    message: "Password changed successfully.",
                    data: result,
                });
            }
        });
    }
};


// change password controller funtion
const changePassCon = async (req, res) => {
    if(!(req.body.newpassword === req.body.cnfpassword)){
        res.json({
            status: 422,
            success: false,
            message: "New password and Confirm password should be same.",
        });
    }
    else if(req.body.newpassword === req.body.oldpassword){
        res.json({
            status: 422,
            success: false,
            message: "New password and Old password should be not same.",
        });
    }
    else{
        req.params.id = cryptr.decrypt(req.params.id);
        req.body.newpassword = await bcrypt.hash(req.body.newpassword, 12);
        UserModal.checkPass(req.params.id, (err, result) => {
            if (err) {
                if (err == 404) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Something went wrong. Try again...",
                    });
                } else {
                    res.json({
                        status: 405,
                        success: false,
                        message: err.sqlMessage,
                    });
                }
            }
            else if(!(result.password == '')) {
                bcrypt.compare(req.body.oldpassword, result.password, (error, resu) => {
                    if (error) {
                        res.json({
                            status: 404,
                            success: false,
                            message: "Something went wrong. Try again...",
                        });
                    }
                    else if (resu) {
                        UserModal.changePass(req.params.id, req.body.newpassword,  (err, result) => {
                            if(err){
                                res.json({
                                    status: 404,
                                    success: false,
                                    message: "Something went wrong. Try again...",
                                });
                            }
                            else if(!(result == '')){
                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "Password changed successfully.",
                                    data: result,
                                });
                            }
                        });
                    }
                    else {
                        res.json({
                            status: 404,
                            success: false,
                            message: "Old password does not match...",
                        });
                    }
                });
            }
        });
    }
};



// profile show controller function
const profileShowCon = (req, res) => {
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.json({
            status: 422,
            success: false,
            message: "Please fill all fields.",
        });
    }
    else {
        req.params.id = cryptr.decrypt(req.params.id);
        UserModal.profileShow(req.params.id, (err, result) => {
            if (err) {
                if (err == 404) {
                    res.json({
                        status: 404,
                        success: false,
                    });
                } else {
                    res.json({
                        status: 405,
                        success: false,
                    });
                }
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    user: result[0],
                });
            }
        });
    }
}



// profile update controller function
const profileUpdateCon = (req, res) => {
    const userData = new UserModal(req.body);
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.json({
            status: 422,
            success: false,
            message: "Please fill all fields.",
        });
    }
    else {
        req.params.id = cryptr.decrypt(req.params.id);
        UserModal.profileUpdate(req.params.id, userData, (err, result) => {
            if (err) {
                if (err == 404) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Something went wrong. Try again..."
                    });
                } else {
                    res.json({
                        status: 405,
                        success: false,
                        message: err.sqlMessage,
                    });
                }
            }
            else {
                res.json({
                    status: 200,
                    success: true,
                    message: "Update successfully",
                    result: result,
                });
            }
        });
    }
};



// delete account controller function
const deleteAccountCon = (req, res) => {
    req.params.id = cryptr.decrypt(req.params.id);
    UserModal.deleteAccount(req.params.id, (err, result) => {
        if (err) {
            if (err == 404) {
                res.json({
                    status: 404,
                    success: false,
                    message: "Something went wrong. Try again..."
                });
            } else {
                res.json({
                    status: 405,
                    success: false,
                    message: err.sqlMessage,
                });
            }
        }
        else {
            res.json({
                status: 200,
                success: true,
                message: "Delete successfully",
                result: result,
            });
        }
    });
};



module.exports = {
    createNewRecordCon,
    verificationCon,
    loginUserCon,
    forgetPassCon,
    resetPassCon,
    changePassCon,
    profileShowCon,
    profileUpdateCon,
    deleteAccountCon,
};