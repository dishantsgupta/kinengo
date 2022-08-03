const conn = require("../../config/db.config");
const sendMailForget = require("../../config/mail.config");
const registrationMail = require("../../config/registrationMail.config");


const userModal = function (user) {
    this.username = user.username;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.phone = user.phone;
    this.emailid = user.emailid;
    this.password = user.password;
    this.status = 0;
    this.user_type_id = 2;
};



// Random number generate function
const between = (min, max) => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}



// registration user 
userModal.createNewUser = (userData, email, result) => {
    conn.query("INSERT INTO user SET ?", userData, (err, results, feilds) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            const randInt = between(190909, 999999);
            let sql = `UPDATE user SET token = ${randInt} WHERE emailid = '${email}'`;
            conn.query(sql, (err, resu, fields) => {
                if (err) {
                    result(err);
                }
                else {
                    registrationMail(email, randInt);
                    result(null, resu);
                }
            });
        }
    });
};



// verification
userModal.verication = (otp, result) => {
    conn.query(`SELECT username, emailid from user WHERE token = ${otp} and status = 0`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == '')) {
            conn.query(`UPDATE user SET token = ${null}, status = 1 WHERE token = ${otp}`, (error, resultss, field) => {
                if (error) {
                    result(error);
                }
                else {
                    result(null, resultss);
                }
            })
        }
        else {
            result(404);
        }
    })
};



// login user
userModal.loginUser = (email, result) => {
    conn.query(`SELECT userid, username, first_name, last_name, emailid, phone, password from user where emailid = '${email}' and status = 1`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else {
            if (!(results == "")) {
                result(null, results[0]);
            }
            else {
                result(404);
            }
        }
    });
};



// forget password 
userModal.forgetPass = (email, result) => {
    conn.query(`SELECT * from user where emailid = '${email}' and status = 1`, (err, results, feilds) => {
        if (err) {
            result(err);
        }
        else if (!(results == "")) {
            const randInt = between(190909, 999999);
            let sql = `UPDATE user SET token = ${randInt} WHERE emailid = '${email}'`;
            conn.query(sql, (err, resu, fields) => {
                if (err) {
                    result(err);
                }
                else if (!(resu == '')) {
                    sendMailForget(email, randInt);
                    result(null, resu);
                }
            });
        }
        else {
            result(404);
        }
    });
};



// reset password 
userModal.resetPass = (otp, password, result) => {
    conn.query(`SELECT username, emailid from user WHERE token = ${otp} and status = 1`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == '')) {
            conn.query(`UPDATE user SET token = ${null}, password = '${password}' WHERE token = ${otp}`, (error, resultss, field) => {
                if (error) {
                    result(error);
                }
                else {
                    result(null, resultss);
                }
            })
        }
        else {
            result(404);
        }
    });
};


// check password (match old password)
userModal.checkPass = (id, result) => {
    conn.query(`SELECT password from user WHERE userid = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else if (!(results == '')) {
            result(null, results[0]);
        }
        else {
            result(404);
        }
    });
};


// change password
userModal.changePass = (id, newpassword, result) => {
    conn.query(`UPDATE user SET password = '${newpassword}' WHERE userid = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else {
            result(null, results);
        }
    });
};


// profile show
userModal.profileShow = (id, result) => {
    conn.query(`SELECT * from user WHERE userid = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else {
            result(null, results);
        }
    });
};


// profile update
userModal.profileUpdate = (id, userdata, result) => {
    conn.query(`UPDATE user SET username = '${userdata.username}', first_name = '${userdata.first_name}', last_name = '${userdata.last_name}', emailid = '${userdata.emailid}', phone = '${userdata.phone}' WHERE userid = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else {
            result(null, results);
        }
    });
};


userModal.deleteAccount = (id, result) => {
    conn.query(`DELETE FROM user WHERE userid = ${id}`, (err, results, fields) => {
        if (err) {
            result(err);
        }
        else {
            result(null, results);
        }
    });
};



module.exports = userModal;