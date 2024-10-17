import React, { useEffect, useState } from 'react'
import "./BookingPage.css"
import axiosInstance from '../../Config/AxiosConfig';
import { useAuth0 } from "@auth0/auth0-react";

export const BookingPage = () => {
  const { user } = useAuth0()
  const [booking, setBooking] = useState([])

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const postData = {
          username: user.sub
        }
        const response = await axiosInstance.post("/booking/get", postData)
        if (response.data.success) {
          setBooking(response.data.data)
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert(error.response?.data?.message || "Internal Server Error")
      }
    }
    fetchBooking()
  }, [user, booking])

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel the booking?")
    if (confirm) {
      try {
        const postData = {
          booking_id: id
        }
        const response = await axiosInstance.post("/booking/delete", postData)
        if (response.data.success) {
          alert(response.data.message)
          const updatedBooking = booking.filter(book => book.bookingId !== id)
          setBooking(updatedBooking)
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert(error.response?.data?.message || "Internal Server Error")
      }
    }
  }
  const renderBooking = () => {
    if (booking.length === 0) {
      return <div className='booking-empty'>No Booking Avalible</div>
    } else {
      return (
        <>
          <div className='booking-header'>
            <h4>Date</h4>
            <h4>Time</h4>
            <h4>Location</h4>
            <h4>Vehicle No</h4>
            <h4>Mileage</h4>
            <h4>Actions</h4>
          </div>
          {booking.map((ele) => {
            return (
              <div className='booking-div' key={ele.booking_id}>
                <h4>{ele.date.split('T')[0]}</h4>
                <h4>{ele.time.substring(0, 5)}</h4>
                <h4>{ele.location}</h4>
                <h4>{ele.vechile_no}</h4>
                <h4>{ele.mileage}</h4>
                {new Date(ele.date) > new Date() && (
                  <button onClick={() => handleDelete(ele.booking_id)}>Cancel Booking</button>
                )}
              </div>
            );
          })}
        </>
      )
    }
  }
  return (
    <div className='booking'>
      <h1>Booking History</h1>
      {renderBooking()}
    </div>
  )
}
