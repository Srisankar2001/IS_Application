import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./RegisterPage.css"
import { useAuth0 } from '@auth0/auth0-react';
import { RegisterValidation } from '../../Functions/RegisterValidation';
import axiosInstance from '../../Config/AxiosConfig';
import DOMPurify from 'dompurify'; 

export const RegisterPage = () => {
    const { user } = useAuth0()
    const [input, setInput] = useState({
        date: "",
        time: "",
        location: "",
        vechile: "",
        mileage: "",
        message: ""
    })
    const [error, setError] = useState({
        date: "",
        time: "",
        location: "",
        vechile: "",
        mileage: ""
    })

    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleReset = (e) => {
        setInput({
            date: "",
            time: "",
            location: "",
            vechile: "",
            mileage: "",
            message: ""
        })
        setError({
            date: "",
            time: "",
            location: "",
            vechile: "",
            mileage: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = RegisterValidation(input)
        setError(errors)
        if (Object.values(errors).every(error => error === "")) {
            try {
                const sanitizedMessage = DOMPurify.sanitize(input.message);
                const postData = {
                    date: input.date,
                    time: input.time,
                    location: input.location,
                    vechile_no: input.vechile.trim().toUpperCase(),
                    mileage: input.mileage,
                    message: input.message ? sanitizedMessage.trim() : "None",
                    username: user.sub
                }
                const response = await axiosInstance.post("booking/create", postData)
                if(response.data.success){
                    alert(response.data.message)
                    handleReset()
                }else{
                    alert(response.data.message)
                }
            }catch(error){
                alert(error.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className='register-div'>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className='register-input-div'>
                    <div className='register-input'>
                        <label>Date</label>
                        <input type='date' name='date' value={input.date} onChange={handleChange}/>
                        {error.date && <span>{error.date}</span>}
                    </div>
                    <div className='register-input'>
                        <label>Time</label>
                        <select name='time' value={input.time} onChange={handleChange}>
                            <option value="">Select Time</option>
                            <option value="09:00">09:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                        </select>
                        {error.time && <span>{error.time}</span>}
                    </div>
                    <div className='register-input'>
                        <label>Location</label>
                        <select name='location' value={input.location} onChange={handleChange}>
                            <option value="">Select Location</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Galle">Galle</option>
                        </select>
                        {error.location && <span>{error.location}</span>}
                    </div>
                    <div className='register-input'>
                        <label>Vechile Number</label>
                        <input type='text' name='vechile' value={input.vechile} onChange={handleChange} placeholder='Format : AB1234'/>
                        {error.vechile && <span>{error.vechile}</span>}
                    </div>
                    <div className='register-input'>
                        <label>Mileage</label>
                        <input type='number' name='mileage' value={input.mileage} onChange={handleChange} />
                        {error.mileage && <span>{error.mileage}</span>}
                    </div>
                    <div className='register-input'>
                        <label>Additional Message</label>
                        <input type='text' name='message' value={input.message} onChange={handleChange} />
                        {error.message && <span>{error.message}</span>}
                    </div>
                </div>
                <div className='register-btn-div'>
                    <input type="submit" value="Submit" className='register-btn-submit' />
                    <input type="reset" value="Cancel" className='register-btn-cancel' />
                </div>
            </form>
        </div>
    );
}
