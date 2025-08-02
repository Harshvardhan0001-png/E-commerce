import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})
const path = require('path');
const express = require('express');
// (you probably already have express and other middleware earlier)

// --- static serving for combined frontend + admin ---
const publicDir = path.join(__dirname, 'public');

// Serve shop (frontend) at root
app.use(express.static(publicDir));

// Serve admin panel under /admin
app.use('/admin', express.static(path.join(publicDir, 'admin')));

// Fallback for SPA frontend routes (non-API, non-admin)
app.get(['/','/collections*','/product*','/cart*','/login*','/verify*','/orders*','/placeorder*','/contact*','/about*'], (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Fallback for admin subroutes
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(publicDir, 'admin', 'index.html'));
});
// --- end static serving ---

app.listen(port, ()=> console.log('Server started on PORT : '+ port))