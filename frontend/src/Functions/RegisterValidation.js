export const RegisterValidation = (input) => {
    const error = {
        date: "",
        time: "",
        location: "",
        vechile: "",
        mileage: ""
    }

    const date = input.date
    const time = input.time
    const location = input.location
    const vechile = input.vechile.trim().toUpperCase()
    const mileage = input.mileage

    if (date === "") {
        error.date = "Date Field is Empty"
    } else {
        const selectedDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (selectedDate <= today) {
            error.date = "Invalid date"
        } else if (selectedDate.getDay() === 0) {
            error.date = "Sunday shops are closed"
        } else {
            error.date = ""
        }
    }

    if (time === "") {
        error.time = "Time Field is Empty"
    } else {
        error.time = ""
    }

    if (location === "") {
        error.location = "Location Field is Empty"
    } else {
        error.location = ""
    }

    if (vechile === "") {
        error.vechile = "Vechile Number Field is Empty"
    } else if (!(/^[A-Z]{2}[0-9]{4}$/.test(vechile))) {
        error.vechile = "Invalid Vechile Number. Format(AB1234)"
    } else {
        error.vechile = ""
    }

    if (mileage === "") {
        error.mileage = "Mileage Field is Empty"
    } else if (mileage <= 0) {
        error.mileage = "Invalid Mileage"
    } else {
        error.mileage = ""
    }

    return error
}
