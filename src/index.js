const express = require('express');
const userRouter = require('./routes/Userroutes');
const bookRouter = require('./routes/Bookroutes');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));   

const mongoose = require("mongoose")
app.use(express.json());

app.use(cors());

app.use((req,res,next)=>{
    console.log("HTTP method - "+req.method +" URL - "+ req.url);
    next();
})

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.get("/", (req, res) => {
    res.send("Hello");
}) 

const port = process.env.PORT || 5000;
//db connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => {
            console.log("Server started on port no: "+ port);
        })
    })
    .catch(() => {
        console.log(mongoose.Error)
    })