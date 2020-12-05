import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { dateList } from '../components/microcomponents/dates'
import Nav from '../components/nav'
import { Fauna, login, register, secret } from '../services/fauna'
import { faunaProvider, useFauna } from '../services/faunaold'
import styles from '../styles/Home.module.css'

export default function Home() {

  const today = new Date()
  var month = today.getMonth()
  var possibleNewMonth = month + 1
  var year = today.getFullYear()
  var day = today.getUTCDay()
  const currentMonth = dateList[today.getFullYear()].filter(property => property.numMonth === today.getUTCMonth())
  const [yourId, setYourId] = useState("")
  const [eventList, setEventList] = useState("")
  var filteredEvents
  var thisWeeksYearList = []
  var thisWeeksDayList = []
  var thisWeekMonthList = []
  var weeksEvents = []

  
  console.log(today)
  console.log(today.getFullYear())
  console.log(today.getMonth())
  console.log(today.getUTCDate())
  console.log(today.getUTCDay())
  
  const date = today.getUTCDate()
  var daysInTheWeek
  const week = date + 6
  var lastDay
  var brandnewMonth
  var thisWeek = []

  console.log(date)
  
  /*   if(currentMonth[0].length === 31 && week > 31) {
    lastDay = week - 31
    if(month + 1 > 11){
      year = year + 1
      month = 0
    } else {
      month = 1
    }
  } */
  
  for(daysInTheWeek = today.getUTCDate(); daysInTheWeek <= week; daysInTheWeek++){
    let newDay = day++
    if(currentMonth[0].length === 31 && daysInTheWeek > 31){
      if(possibleNewMonth > 11){
        if(newDay >= 7){
          thisWeek.push({
            date: daysInTheWeek - 31,
            month: 0,
            year: year + 1,
            day: newDay - 7
          })
        } else {
          thisWeek.push({
            date: daysInTheWeek - 31,
            month: possibleNewMonth,
            year: year + 1,
            day: newDay
          })
        }
      } else if(newDay >= 7) {
        thisWeek.push({
          date: daysInTheWeek - 31,
          month: 0,
          year: year,
          day: newDay - 7
        })
      } else {
        thisWeek.push({
          date: daysInTheWeek - 31,
          month: possibleNewMonth,
          year: year,
          day: newDay
        })
      }
    } else if(currentMonth[0].length === 30 && daysInTheWeek > 30) {
      if(possibleNewMonth > 11){
        if(newDay >= 6){
          thisWeek.push({
            date: daysInTheWeek - 30,
            month: 0,
            year: year + 1,
            day: newDay - 7
          })
        } else {
          thisWeek.push({
            date: daysInTheWeek - 30,
            month: 0,
            year: year + 1,
            day: newDay
          })
        }
      } else if(newDay >= 7) {
        thisWeek.push({
          date: daysInTheWeek - 30,
          month: possibleNewMonth,
          year: year,
          day: newDay - 7
        })
      } else {
        thisWeek.push({
          date: daysInTheWeek - 30,
          month: possibleNewMonth,
          year: year,
          day: newDay
        })
      }
    } else if(newDay >= 7){
      thisWeek.push({
        date: daysInTheWeek,
        month: month,
        year: year,
        day: newDay - 7
      })
    } else {
      thisWeek.push({
        date: daysInTheWeek,
        month: month,
        year: year,
        day: newDay
      })
    }
  }
  
  console.log(today)
  console.log(currentMonth[0].length)
  console.log(thisWeek)
  
  const results = thisWeek.map(thatWeek => 
    dateList[thatWeek.year].filter(property => 
      thatWeek.month === property.numMonth
      )
      )
      
  console.log(results)
  

  thisWeek.map(thatWeek => console.log(thatWeek.year))

  const testDate = new Date(thisWeek[1].year, thisWeek[1].month, thisWeek[1].date)
  console.log(testDate)

  /* results.map(eachOne => thisWeek.map(thatWeek => eachOne.map(one => one.date = thatWeek.date))) */
  thisWeek.map(thatWeek => results.map(eachOne => eachOne.filter(one => thatWeek.month === one.numMonth && thatWeek.year === one.year && (
    thatWeek.month = one.month,
    thatWeek.numMonth = one.numMonth,
    thatWeek.length = one.length
  ))))
  
  thisWeek.forEach(thatWeek => thatWeek.day === 0 ? thatWeek.dayName = "Sun" : 
  thatWeek.day === 1 ? thatWeek.dayName = "Mon" :
    thatWeek.day === 2 ? thatWeek.dayName = "Tues" : 
    thatWeek.day === 3 ? thatWeek.dayName = "Wed" : 
    thatWeek.day === 4 ? thatWeek.dayName = "Thu" : 
    thatWeek.day === 5 ? thatWeek.dayName = "Fri" : 
    thatWeek.day === 6 ? thatWeek.dayName = "Sat" :
    thatWeek.dayName = "day"
    )
    
    console.log(thisWeek)

    async function getData() {
      const res = await fetch("api/readEvents")
      let data = await res.json()
      setEventList(data)
    }
    
    useEffect(() => {
      setYourId(localStorage.getItem("userID"))
      getData()
    }, [])

    console.log(eventList)

    /* eventList ? thisWeek.map(thatWeek => eventList.filter(anEvent => anEvent.year === thatWeek.year)) : filteredEvents = [] */
    /* eventList ? eventList.filter(anEvent => thisWeek.map(thatWeek => anEvent.data.year === thatWeek.year)) : filteredEvents = [] */
    
    /* eventList ? filteredEvents = eventList.filter(anEvent => anEvent.data.year === 2019) : filteredEvents = [] */

    thisWeek.map(thatWeek => {
      thisWeeksYearList.push(thatWeek.year)
      thisWeeksDayList.push(thatWeek.day)
      thisWeekMonthList.push(thatWeek.month)
    })

    console.log(thisWeeksYearList)

/*     eventList ? filteredEvents = thisWeeksYearList.map(year => eventList.filter(anEvent => {
      year === anEvent.data.year

    })) : filteredEvents = [] */

    eventList ? filteredEvents = thisWeek.map(thatWeek => eventList.filter(anEvent => 
      anEvent.data.monthName === thatWeek.month && anEvent.data.year === thatWeek.year && anEvent.data.day === thatWeek.date)) : filteredEvents = []

    console.log(filteredEvents)
    filteredEvents.map(one => one.map(each => weeksEvents.push(each)))
    /* console.log(testArray)
    
    filteredEvents = filteredEvents.slice(0, 1)
    filteredEvents.map(one => one.map(each => weeksEvents.push(each))) */

    console.log(weeksEvents)
    console.log(filteredEvents)
    console.log(eventList)

    const tryIt = "@ref"
    
    weeksEvents.map(anEvent => console.log(anEvent.ref['@ref'].id))

    weeksEvents.map(anEvent => {
      anEvent.data.start.slice(0, 2) === "01" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "02" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "03" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "04" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "05" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "06" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "07" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "08" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "09" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "10" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "11" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      anEvent.data.start.slice(0, 2) === "12" ? anEvent.data.start = anEvent.data.start + " " + "AM" :
      console.log("impossible time")
    })

    weeksEvents.sort(anEvent => anEvent.data.day)

  return (
    <faunaProvider>
      <Nav />
      <h1 style={{color: "#292E3B"}}>Dashboard</h1>
      <p>Select Date to create Event</p>
      {thisWeek.map(eachDay => 
          <Link href={`/create?title=${eachDay.numMonth}_${eachDay.date}_${eachDay.year}`}>
            <div className={styles.card}>
              <h1>{eachDay.date}</h1>
              <h2>{eachDay.dayName}</h2>
              <h5 className={styles.month}>{eachDay.month}</h5>
            </div>
          </Link>
      )}
      <h1 style={{color: "#292E3B"}}>Events</h1>
      {weeksEvents && weeksEvents.map(anEvent =>
          <div style={{verticalAlign: "middle"}} className={styles.eventCard}>
            <h2>{anEvent.data.day}</h2>
            <p style={{fontSize: "14px"}}>{anEvent.data.event}</p>
            <p style={{fontSize: "14px"}}>{anEvent.data.start} - {anEvent.data.end}</p>
            <h5 className={styles.month}>{anEvent.data.monthName}</h5>
            <div style={{justifyContent: "center", display: "flex"}}>
              <svg className={styles.options} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
              </svg>
              <Link href={`/edit?title=${anEvent.ref['@ref'].id}`}>
                <svg className={styles.options} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
              </Link>
            </div>
          </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </faunaProvider>
  )
}
