import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import booking from './routes/bookingRoutes.js'

dotenv.config()

const app=express()
app.use(cors())
app.use(express.json())
app.use('/api',booking)
app.listen(process.env.PORT,()=>{
    console.log(`server start on port ${process.env.PORT}`)
})