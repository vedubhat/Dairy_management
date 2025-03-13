const express = require('express');
const cors = require('cors');
const db = require('./config/connection');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/' , (req ,res) => {
    return res.send('Hello');
})

app.listen(3000, ()=>{
    console.log('server is listening');
})

