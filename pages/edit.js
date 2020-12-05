import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Nav from '../components/nav'

export default function Edit() {

    const router = useRouter()
    
    const id = router.query.title
    console.log(id)
    const [eventData, setEventData] = useState({})
    const [event, setEvent] = useState(eventData.event)
    const [day, setDay] = useState(eventData.day)
    const [start, setStart] = useState(eventData.start)
    const [end, setEnd] = useState(eventData.end)
    const [month, setMonth] = useState(eventData.month)
    const [monthName, setMonthName] = useState(eventData.monthName)
    const [userId, setUserId] = useState(eventData.userId)
    const [date, setDate] = useState(new Date())
    const [year, setYear] = useState(eventData.year)

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({data: id})
    }

    async function receiveData(){
        const res = await fetch('api/getEvent', requestOptions)
        let data = await res.json()
        console.log(data)
        setEventData(data)
        setEvent(data.event)
        setDay(data.day)
        setStart(data.start)
        setEnd(data.end)
        setMonth(data.month)
        setMonthName(data.monthName)
        setUserId(data.userID)
        setYear(data.year)
        setDate(data.date)
    }

    var editableDate = date
    console.log(editableDate)

    console.log(Number(date[8] + date[9]))

    const sendOptions = {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({data: {
            eventID: id,
            event: event,
            date: date,
            month: month,
            monthName: monthName,
            day: Number(date[8] + date[9]),
            year: year,
            start: start,
            end: end,
            userID: userId
        }})
    }

    async function addData(){
        await fetch("api/updateEvent", sendOptions).then(() => {
            console.log("this is working")
            router.push("/")
        }).catch(e => console.log(e))
    }


    
    useEffect(() => {
        receiveData()
        day && day.toString().length === 1 ? setDate(year + "-" + month + "-" + "0" + day.toString()) : setDate(year + "-" + month + "-" + day)
        
    }, [])

    console.log("event: " + event)


    return (
        <>
        <Nav />
        <div className="eventForm">
            <input type="text" value={event} className="eventNameInput" onChange={event => setEvent(event.target.value)} name="event" placeholder="Event Name"/>
            <br />
            {date && <input type="date" value={date.toString()} className="eventDateInput" onChange={event => setDate(event.target.value)} name="date" />}
            <br />
            <label>Start</label><input type="time" value={start} onChange={event => setStart(event.target.value)} className="eventDateInput" name="start" />
            <br />
            <label>End</label><input type="time" value={end} onChange={event => setEnd(event.target.value)} className="eventDateInput" name="end" />
            <br />
            <button type="submit" className="eventSubmitButton" onClick={() => addData()} >Edit Event</button>
        </div>
    </>
    )
}
