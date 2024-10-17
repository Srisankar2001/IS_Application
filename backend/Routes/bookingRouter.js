const express = require("express")
const router = express.Router()
const {createBooking, deleteBooking, getAllBooking} = require("../Controller/bookingController")

router.post("/create",createBooking)
router.post("/delete",deleteBooking)
router.post("/get",getAllBooking)

module.exports = router