const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser')
const db = require('./config/connection');
const UserRouter = require('./routes/UserRouter');
const AdminRouter = require('./routes/AdminRouter');
const app = express();
app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/' , (req ,res) => {
    return res.send('Hello');
});

app.use('/user' , UserRouter);
app.use('/admin' , AdminRouter);


app.listen(3000);


