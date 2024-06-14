import express from 'express';
import mongoose from 'mongoose';
import db_connection from './dbConnect.js';

const port = 5000 ; 




db_connection()
.then(()=>{
   console.log(`Server Running on Port : ${port}`)
})

.catch((err)=>{
    console.log(err)
})


