import { db } from "../config/dbConfig.js"

async function getAllRooms(req,res) {
    try {
        const [roomData]=await db.query('SELECT * FROM rooms')
        return res.status(200).json({data:roomData,success:true})
        
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}
async function createBooking(req,res) {
    const {startTime,endTime,roomId,title,organizerEmail,attendees}=req.body;
    try {
        if(!startTime){
            return res.status(400).json({message:"Start time is required",success:false})
        }else if(!endTime){
            return res.status(400).json({message:"End time is required",success:false})
        }else if (!roomId){
            return res.status(400).json({message:"Please select a room",success:false})
        }else if (title?.length==0){
            return res.status(400).json({message:"Please enter a title",success:false})
        }else if (organizerEmail?.length==0){
            return res.status(400).json({message:"Please enter orginizer email",success:false})
        }else if (!attendees){
            return res.status(400).json({message:"Please enter attendees",success:false})
        }else if(new Date()>new Date(startTime)){
            return res.status(400).json({message:"Booking cannot be in past",success:false})
        }else if(new Date(startTime)>new Date(endTime)){
            return res.status(400).json({message:"end must be after start",success:false})
        }

        const [isRoomExist]=await db.query('SELECT * FROM rooms WHERE id=?',[roomId])
        if(isRoomExist.length==0){
            return res.status(400).json({message:"Please select a valid room",success:false})
        }
        if(attendees>isRoomExist[0].capacity){
            return res.status(400).json({message:`Max room capacity is ${isRoomExist[0].capacity}`,success:false})
        }
        const [overlappingBookings]=await db.query('SELECT * FROM booking WHERE roomId=? AND startTime <? AND endTime>? AND status=?',[roomId,endTime,startTime,"confirmed"])
        if(overlappingBookings?.length>0){
            return res.status(409).json({message:"this room is already book for selected time"})
        }
        const [orginizerData]=await db.query('SELECT * FROM booking WHERE organizerEmail=? and DATE(startTime)=CURDATE()',[organizerEmail,])
        if(orginizerData?.length==3){
            return res.status(409).json({message:"An organizer cannot hold more than 3 confirmed bookings that start on the same day",success:false})
        }
        const [data]=await db.query('INSERT INTO booking (startTime,endTime,title,organizerEmail,attendees,status,roomId) VALUES (?,?,?,?,?,?,?)',[startTime,endTime,title,organizerEmail,attendees,'confirmed',roomId])
        return res.status(201).json({message:"Booking created",success:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message,success:false})
    }
}
async function getDayBooking(req,res) {
    const {date,roomId}=req.query;
    try {
        const [data]=await db.query('SELECT * FROM booking WHERE DATE(startTime) = ? OR roomId=?',[date,roomId])
        return res.status(200).json({data,success:true,message:"day booking fetched"})
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}
async function cancelBooking(req,res) {
    const {id}=req.params;
    try {
        const [isDataExist]=await db.query('SELECT * FROM booking WHERE id=?',[id])
        if(isDataExist.length==0){
            return res.status(404).json({message:"booking not found",success:false})
        }
        if(isDataExist[0].status=="cancelled"){
            return res.status(404).json({message:"Your booking was already cancelled",success:false})
        }
        const [data]=await db.query('UPDATE booking SET status=? WHERE id=?',['cancelled',id])
        console.log("Test",data)
        return res.status(200).json({message:"Your booking was cancel",success:true})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message,success:false})
    }
}
export {getAllRooms,createBooking,getDayBooking,cancelBooking}