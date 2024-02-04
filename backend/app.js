const express = require("express");
var cors = require('cors')

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors())

// adding new user

//login of user

app.use("/", require("./routes/signin")); 
app.use("/admin", require("./routes/adminroutes"));
app.use("/user", require("./routes/Userroutes"));
app.listen(3000);
