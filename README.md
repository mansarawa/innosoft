Tech Stack ->
Backend=>Node Js ,Express Js 
Frontend=>Vite ,React 
Dependency used=>express,cors,mysql2,dotenv,axios,bootstrap

Backend Url=http://localhost:9200
Backend run =>
    npm i
    npx nodemon

Frontend Url=http://localhost:5173
Frontend run =>
    npm i
    npm run dev

Features Done ->
    Booking Creation Api,
    Get Booking,
    Cancel Booking,
    Get Rooms 

Rule Pending->
start and end must fall on 15-minute boundaries (minutes are 00, 15, 30 or 45, with zero seconds).
A booking must last at least 15 minutes and at most 4 hours
A booking must fall entirely within business hours, 08:00 to 20:00 UTC, and start and end on the same UTC day

