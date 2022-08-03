const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./src/routes/user.route");
const adminRouter = require("./src/routes/admin.route");



// create port
const port = process.env.PORT || 5000;

// create app
const app = express();

// parser request data content type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parser request data content type : application/json
app.use(bodyParser.json());

// main user route
app.use('/', userRouter);

// main user route
app.use('/admin', adminRouter);

// app listen
app.listen(port, (err, res) => {
    if (err) {
        console.warn("Server is not run. ", err);
    }
    else {
        console.log(`Server is running on port number ${port}...`);
    }
});