import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as localForage from 'localforage'
import Nav from '../components/nav'

export default function Edit({id}) {

    const router = useRouter()
    console.log(id)
    const [yourEvents, setYourEvents] = useState([])
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
    var openSchedule = true

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

    var startNumPart1
    var startNumPart2
    var startNum
    start ? startNumPart1 = Number(start.split(":")[0]) : startNumPart1 = 0
    start ? startNumPart2 = Number(start.split(":")[1])/60 : startNumPart2 = 0
    start ? startNum = startNumPart1 + startNumPart2 : startNum = 0

    var endNumPart1
    var endNumPart2
    var endNum
    end ? endNumPart1 = Number(end.split(":")[0]) : endNumPart1 = 0
    end ? endNumPart2 = Number(end.split(":")[1])/60 : endNumPart2 = 0
    end ? endNum = endNumPart1 + endNumPart2 : endNum = 0

    var sendOptions = {
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
            startNum: startNumPart1 + startNumPart2,
            endNum: endNumPart1 + endNumPart2,
            userID: userId
        }})
    }

    async function addData(){
        openSchedule && await fetch("api/updateEvent", sendOptions).then(() => {
            console.log("this is working")
            router.push("/")
        }).catch(e => console.log(e))
    }

    async function getYourData(id){
        const res = await fetch("api/readYourEvents", {
          method: "POST",
          headers: {"Content-Type": 'application/json'},
          body: JSON.stringify({id: id})
        })
        let data = await res.json()
        console.log(data)
        setYourEvents(data)
      }

      async function getId(){
        let userID = await localForage.getItem('userID').then(value => value).catch(err => console.log(err)).finally(() => console.log("nothing"))
        getYourData(userID)
      }

    
    useEffect(() => {
        getId()
        receiveData()
        day && day.toString().length === 1 ? setDate(year + "-" + month + "-" + "0" + day.toString()) : setDate(year + "-" + month + "-" + day)
    }, [])

    console.log("event: " + event)

    var filteredEvent
    yourEvents ? filteredEvent = yourEvents.filter(anEvent => 
      anEvent.data.day === Number(date.split("-")[2]) && anEvent.data.startNum !== startNum && anEvent.data.endNum !== endNum
      ) : 
      filteredEvent = []

      filteredEvent.filter(anEvent =>
          startNum >= anEvent.data.startNum && startNum <= anEvent.data.endNum || endNum >= anEvent.data.startNum && endNum <= anEvent.data.endNum || (startNum + endNum)/2 >= anEvent.data.startNum && (startNum + endNum)/2 <= anEvent.data.endNum ? openSchedule = false : openSchedule = true    
      )

      console.log(filteredEvent)

      console.log(openSchedule)


    return (
        <>
        <Nav />
        {!openSchedule && <h1>Sorry, but you cannot plan an event because you already have something planned at that time</h1>}
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

export async function getServerSideProps(context){

    return {props: {
        id: context.query.title
    }}
}
