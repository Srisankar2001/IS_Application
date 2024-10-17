const db = require("../DB/DB")

const createBooking = async (req, res) => {
    const { date, time, location, vechile_no, mileage, message, username } = req.body

    if (!date || !time || !location || !vechile_no || !mileage || !message || !username) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    const bookingDate = new Date(date)
    const currentDate = new Date()
    if (bookingDate < currentDate) {
        return res.status(400).json({ success: false, message: "Incorrect Booking Date" })
    }

    const sql = "INSERT INTO booking_table(date, time, location, vechile_no, mileage, message, username) VALUES(?,?,?,?,?,?,?);"

    db.query(sql, [date, time, location, vechile_no, mileage, message, username], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: "Internal Server Error" })
        } else {
            return res.status(200).json({ success: true, message: "Booked Successfully" })
        }
    })
}

const deleteBooking = async (req, res) => {
    const { booking_id } = req.body

    if (!booking_id) {
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    const sql = "SELECT * FROM booking_table WHERE booking_id = ?;"

    db.query(sql, [booking_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal Server Error" })
        } else {
            if (result.length === 0 ) {
                return res.status(404).json({ success: false, message: "Data not found" })
            } else {
                const date = result[0].date
                const bookingDate = new Date(date)
                const currentDate = new Date()
                if (bookingDate <= currentDate) {
                    return res.status(400).json({ success: false, message: "Can't cancel the booking" })
                }else{
                    const sql1 = "DELETE FROM booking_table WHERE booking_id = ?;"

                    db.query(sql1,[booking_id],(err,result)=>{
                        if(err){
                            return res.status(500).json({ success: false, message: "Internal Server Error" })
                        }else{
                            return res.status(200).json({ success: true, message: "Booking Cancelled" })
                        }
                    })
                }
            }
        }
    })
}

const getAllBooking = async(req,res) => {
    const {username} = req.body
    
    if(!username){
        return res.status(400).json({ success: false, message: "Input all necessary data" })
    }

    const sql = "SELECT * FROM booking_table WHERE username = ?;"
    db.query(sql,[username],(err,result)=>{
        if(err){
            return res.status(500).json({ success: false, message: "Internal Server Error" })
        }else{
            return res.status(200).json({ success: true, data: result })
        }
    })
}

module.exports = { createBooking, deleteBooking, getAllBooking }
