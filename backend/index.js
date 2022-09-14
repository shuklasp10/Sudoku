import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router.js';
import dotenv from 'dotenv';

const app = express();
app.use(bodyparser.json({limit:"30mb", extended:true}));
app.use(bodyparser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
dotenv.config();

app.use('/',router);

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>console.log('Database Connected'))
        .catch((e)=>console.log('Database connection unsuccessful'));

app.listen(process.env.PORT,err=>{
    if(err) console.log("server not connected")
    else console.log("server connected");
});
