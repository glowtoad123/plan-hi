import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as localForage from 'localforage'
import Nav from '../components/nav'

export default function Create({thisMonth, thisYear, thisDay}) {
    const router = useRouter()
    const [eventName, setEventName] = useState("")
    const [startEventTime, setStartEventTime] = useState("12:00:00")
    const [endEventTime, setEndEventTime] = useState("14:00:00")
    const [yourEvents, setYourEvents] = useState([])
    var numberStart = startEventTime
    var numberEnd = endEventTime
    const [yourId, setYourId] = useState("")
    var openSchedule = true

    var testDate = new Date(thisYear, thisMonth, thisDay)
    var day = thisDay
    if(day && day.length === 1){
        let zero = "0" + day
        day = "0" + day
    }

    var actualMonth = Number(thisMonth) + 1

    console.log("actualMonth: " + actualMonth)
    
    const selectedDate = thisYear + "-" + actualMonth.toString() + "-" + day
    console.log("selectedDate:", selectedDate)
    console.log(testDate)

    const [eventDate, setEventDate] = useState(selectedDate)

    console.log("eventDate: ", eventDate)

    var month 
     eventDate ? month = eventDate.split("-")[1] : month = 11
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
        setYourId(userID)
        getYourData(userID)
      }
    
    useEffect(() => {
        getId()
    }, [])

    var numberStartPart1 = Number(startEventTime.split(":")[0])
    var numberStartPart2 = Number(startEventTime.split(":")[1])/60
    numberStart = numberStartPart1 + numberStartPart2
    console.log(numberStart)

    var numberEndPart2 = Number(endEventTime.split(":")[1])/60
    var numberEndPart1 = Number(endEventTime.split(":")[0])
    numberEnd = numberEndPart1 + numberEndPart2
    console.log(numberEnd)
    
    var requestOptions
    eventDate && eventDate !== "undefined-NaN-undefined" ? requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({data: {
            event: eventName,
            date: eventDate,
            month: Number(eventDate.split("-")[1]),
            monthName: monthName,
            day: Number(eventDate.split("-")[2]),
            year: Number(eventDate.split("-")[0]),
            start: startEventTime,
            startNum: numberStart,
            endNum: numberEnd,
            end: endEventTime,
            userID: yourId
        }})
      } : requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({data: {
            event: eventName,
            date: selectedDate,
            month: Number(eventDate.split("-")[1]),
            monthName: monthName,
            day: Number(eventDate.split("-")[2]),
            year: Number(eventDate.split("-")[0]),
            start: startEventTime,
            startNum: numberStart,
            endNum: numberEnd,
            end: endEventTime,
            userID: yourId
        }})
      }

    async function addData(){
      openSchedule && await fetch("api/createEvent", requestOptions).then(() => {
          console.log("this is working")
          router.push("/")
        }).catch(e => console.log(e));
    }


      var filteredEvent
      yourEvents ? filteredEvent = yourEvents.filter(anEvent => 
        anEvent.data.day === Number(eventDate.split("-")[2])
        ) : 
        filteredEvent = []

        filteredEvent.filter(anEvent =>
            numberStart >= anEvent.data.startNum && numberStart <= anEvent.data.endNum || numberEnd >= anEvent.data.startNum && numberEnd <= anEvent.data.endNum || (numberStart + numberEnd)/2 >= anEvent.data.startNum && (numberStart + numberEnd)/2 <= anEvent.data.endNum ? openSchedule = false : openSchedule = true    
        )

        console.log(filteredEvent)

        console.log(openSchedule)


    return (
        <>
            <Nav />
            {!openSchedule && <h1>Sorry, but you cannot plan an event because you already have something planned at that time</h1>}
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



export async function getServerSideProps(context){

    return {props: {
        thisMonth: context.query.month,
        thisYear: context.query.year,
        thisDay: context.query.day
    }}
}