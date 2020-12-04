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

    eventList ? thisWeek.map(thatWeek => eventList.filter(anEvent => anEvent.year === thatWeek.year)) : filteredEvents = []
    /* eventList ? eventList.filter(anEvent => thisWeek.map(thatWeek => anEvent.data.year === thatWeek.year)) : filteredEvents = [] */
    
    
    /* eventList ? filteredEvents = eventList.filter(anEvent => anEvent.data.year === 2020) : filteredEvents = [] */
    console.log(filteredEvents)

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
    </faunaProvider>
  )
}
