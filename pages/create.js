import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'

export default function Create() {
    const router = useRouter()
    const [eventName, setEventName] = useState("")
    const [startEventTime, setStartEventTime] = useState("12:00:00")
    const [endEventTime, setEndEventTime] = useState("14:00:00")
    const [yourId, setYourId] = useState("")

    const selectedDateParts = router.query.title.split("_")
    console.log(selectedDateParts)

    var testDate = new Date(selectedDateParts[2], selectedDateParts[0], selectedDateParts[1])
    var day = selectedDateParts[1].toString()
    if(day.length === 1){
        let zero = "0" + day
        day = "0" + day
    }

    var actualMonth = Number(selectedDateParts[0]) + 1

    console.log("actualMonth: " + actualMonth)
    
    const selectedDate = selectedDateParts[2] + "-" + actualMonth.toString() + "-" + day
    console.log(selectedDate)
    console.log(testDate)

    const [eventDate, setEventDate] = useState(selectedDate)

    const month = eventDate.split("-")[1]
    console.log("Month: " + month)

    var monthName

    console.log(Number(month) - 1)

    Number(month) - 1 === 0 ? monthName = "January" :
    Number(month) - 1 === 1 ? monthName = "Febrary" :
    Number(month) - 1 === 2 ? monthName = "March" :
    Number(month) - 1 === 3 ? monthName = "April" :
    Number(month) - 1 === 4 ? monthName = "May" :
    Number(month) - 1 === 5 ? monthName = "June" :
    Number(month) - 1 === 6 ? monthName = "July" :
    Number(month) - 1 === 7 ? monthName = "August" :
    Number(month) - 1 === 8 ? monthName = "September" :
    Number(month) - 1 === 9 ? monthName = "October" :
    Number(month) - 1 === 10 ? monthName = "November" :
    Number(month) - 1 === 11 ? monthName = "December" :
    monthName = "No Month"

    console.log(monthName)

    useEffect(() => {
        setYourId(localStorage.getItem("userID"))
    }, [])

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({data: {
            event: eventName,
            date: new Date(Number(eventDate.split("-")[0]), Number(eventDate.split("-")[1]), Number(eventDate.split("-")[2])),
            month: Number(eventDate.split("-")[1]),
            monthName: monthName,
            day: Number(eventDate.split("-")[2]),
            year: Number(eventDate.split("-")[0]),
            start: startEventTime,
            end: endEventTime,
            userID: yourId
        }})
      }

    async function addData(){
      await fetch("api/createEvent", requestOptions).then(() => {
          console.log("this is working")
          router.push("/")
        }).catch(e => console.log(e));
    }


    return (
        <>
            <Nav />
            <div className="eventForm">
                <input type="text" value={eventName} className="eventNameInput" onChange={event => setEventName(event.target.value)} name="event" placeholder="Event Name"/>
                <br />
                <input type="date" value={eventDate} className="eventDateInput" onChange={event => setEventDate(event.target.value)} name="date" />
                <br />
                <label>Start</label><input type="time" value={startEventTime} onChange={event => setStartEventTime(event.target.value)} className="eventDateInput" name="start" />
                <br />
                <label>End</label><input type="time" value={endEventTime} onChange={event => setEndEventTime(event.target.value)} className="eventDateInput" name="end" />
                <br />
                <button type="submit" className="eventSubmitButton" onClick={() => addData()}>Add Event</button>
            </div>
        </>
    )
}
