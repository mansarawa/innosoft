import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteApiData, getApiData, postApiData } from '../services/api';

function App() {
  const [isCreate,setIsCreate]=useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [bookings, setBookings] = useState([])
  const [rooms,setRooms]=useState([])
  const [bookingData, setBookingData] = useState({
    "roomId": null,
    "title": "",
    "organizerEmail": "",
    "attendees": null,
    "startTime": "",
    "endTime": ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setBookingData({ ...bookingData, [name]: value })
  }

  async function fetchbooking() {
    const date = new Date().toISOString().split('T')[0];
    try {
      const response = await getApiData(`api/bookings?date=${date}`)
      console.log(response.data)
      setBookings(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async function fetchRooms() {
    try {
      const response = await getApiData(`api/rooms`)
      setRooms(response.data)
    } catch (error) {
      alert(error.message)
    }
  }
  async function handleBooking(e){
    e.preventDefault()
    // const today=new Date()
    // const [hours,minutes]=bookingData.startTime.split(':');
    // today.setHours(hours,minutes,0,0)
    // const dateTime=today.
    try {
      const response=await postApiData('api/booking',bookingData)
      if(response.success){
        setIsCreate(false)
        alert(response.message)
      }else{
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function cancelBooking(id) {
    try {
      const response=await deleteApiData(`api/bookings/${id}`)
      if(response.success){
        fetchbooking()
        alert(response.message)
      }
      
    } catch (error) {
      alert(error.message)
    }
  }
  useEffect(() => {
    fetchbooking()
    fetchRooms()

  }, [selectedDate])

  return (
    <div className='container-fluid text-center'>
      <div className='d-flex justify-content-between'>

      <h1>Meeting room booking system</h1>
      <button className='btn btn-success' onClick={()=>setIsCreate(!isCreate)}>{isCreate?'Close':'Create'} Booking</button>
      </div>
      <div className='container text-start'>
        {isCreate ?<form onSubmit={handleBooking} className='mt-5'>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Organizer Email</label>
            <input type="email" required name="organizerEmail" value={bookingData.organizerEmail} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label for="title" className="form-label">Title</label>
            <input type="text" required name="title" value={bookingData.title} onChange={handleChange} className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label for="title" className="form-label">Attendees</label>
            <input type="number" required name="attendees" value={bookingData.attendees} onChange={handleChange} className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label for="title" className="form-label">Start Time</label>
            <input type="time" required name="startTime" value={bookingData.startTime} onChange={handleChange} className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label for="title" className="form-label">End Time</label>
            <input type="time" required name="endTime" value={bookingData.endTime} onChange={handleChange} className="form-control" id="title" />
          </div>
          <div className="mb-3">
            <label for="room" className="form-label">Select Room</label>
            <select required class="form-select" value={bookingData.roomId} name='roomId' onChange={handleChange} aria-label="Default select example">
              <option selected>-----Select----</option>
              {rooms?.map((item)=><option value={item?.id}>{item?.roomName}</option>)}
              
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>:
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Orginizer email</th>
              <th>Attendees</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((item)=>
                <tr>
                  <td>{item?.title}</td>
                  <td>{item?.organizerEmail}</td>
                  <td>{item?.attendees}</td>
                  <td>{new Date(item?.startTime)?.toLocaleString()}</td>
                  <td>{new Date(item?.endTime)?.toLocaleString()}</td>
                  <td>{item?.status}</td>
                  <td>{item?.status=='confirmed' &&<button onClick={()=>cancelBooking(item?.id)} className="btn btn-danger">Cancel</button>}</td>
                </tr>
              )
            }
          </tbody>
          
          </table>}
      </div>

    </div>
  )
}

export default App
