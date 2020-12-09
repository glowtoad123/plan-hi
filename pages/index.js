import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { dateList } from '../components/microcomponents/dates'
import Nav from '../components/nav'
import { Fauna, login, register, secret } from '../services/fauna'
import { faunaProvider, useFauna } from '../services/faunaold'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [today, setToday] = useState(new Date())
  var month = today.getMonth()

  /////////////////////////////////////////////the possibleNewMonth variable is here in case one of the next 6 days of the week is a new month. This way the curent month won't be displayed in place of a new month
  var possibleNewMonth = month + 1
   /////////////////////////////////////////////the possibleNewMonth variable is here in case one of the next 6 days of the week is a new month. This way the curent month won't be displayed in place of a new month

  var year = today.getFullYear()
  var day = today.getDay()

  /////////////////////////////////////////////the currentMonth const displays a month from the dateList const. The dateList const contains an array of year objects with the length of each month and information of each year (including leap years)
  const currentMonth = dateList[today.getFullYear()].filter(property => property.numMonth === today.getMonth())
  /////////////////////////////////////////////the currentMonth const displays a month from the dateList const. The dateList const contains an array of year objects with the length of each month and information of each year (including leap years)
  
  const [eventList, setEventList] = useState("")
  const [yourEvents, setYourEvents] = useState([])
  var filteredEvents
  var weeksEvents = []

  ///////////////////////////////////////////////Allows page to update without refreshing the page when user deletes an event
  const [deletedItem, setDeletedItem] = useState("")
  ///////////////////////////////////////////////Allows page to update without refreshing the page when user deletes an event

  ///////////////////////////////////////////////////Because I make alot of changes to this page, I always console.log my variables to make sure that everything is working and for debugging purposes you will be seeing these many times throughout this project
  console.log(today)
  console.log(today.getFullYear())
  console.log(today.getMonth())
  console.log(today.getUTCDate())
  console.log(today.getUTCDay())
  
  const date = today.getDate()
  var daysInTheWeek
  const week = date + 6
  var thisWeek = []
  
  console.log(date)
  console.log("this new Date: ", new Date(("'" + year + "-" + month + "-" + date + "'").split('-')))
  
  /*   if(currentMonth[0].length === 31 && week > 31) {
    lastDay = week - 31
    if(month + 1 > 11){
      year = year + 1
      month = 0
    } else {
      month = 1
    }
  } */
  /////////////////////////////////////////////////////////////////////////////////Method of determining the next 6 days of the week
  for(daysInTheWeek = today.getDate(); daysInTheWeek <= week; daysInTheWeek++){
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

/////////////////////////////////////////////////////////////////////////////////Method of determining the next 6 days of the week
  
  console.log(today)
  console.log(currentMonth[0].length)
  console.log(thisWeek)




  //////////////////////////////////////////////filters data from dateList that matches the year and month of thisWeek
  const results = thisWeek.map(dayInWeek => 
    dateList[dayInWeek.year].filter(property => 
      dayInWeek.month === property.numMonth
    )
  )

  //////////////////////////////////////////////filters data from dateList that matches the year and month of thisWeek

      
  console.log(results)
  
  //////////////////////////////////////////////Testing purposes
  thisWeek.map(dayInWeek => console.log(dayInWeek.year))
  
  const testDate = new Date(thisWeek[1].year, thisWeek[1].month, thisWeek[1].date)
  console.log(testDate)
  //////////////////////////////////////////////Testing purposes

  //////////////////////////////////////////////Pulls data from filtered data (const results) and puts the data into thisWeek
  thisWeek.map(dayInWeek => results.map(eachOne => eachOne.filter(one => dayInWeek.month === one.numMonth && dayInWeek.year === one.year && (
    dayInWeek.month = one.month,
    dayInWeek.numMonth = one.numMonth,
    dayInWeek.length = one.length
  ))))
  //////////////////////////////////////////////Pulls data from filtered data (const results) and puts the data into thisWeek
  
  ////////////////////////////////////////////////////////////////////////////////Method of finding determing which day it is
  thisWeek.forEach(dayInWeek => dayInWeek.day === 0 ? dayInWeek.dayName = "Sun" : 
  dayInWeek.day === 1 ? dayInWeek.dayName = "Mon" :
    dayInWeek.day === 2 ? dayInWeek.dayName = "Tues" : 
    dayInWeek.day === 3 ? dayInWeek.dayName = "Wed" : 
    dayInWeek.day === 4 ? dayInWeek.dayName = "Thu" : 
    dayInWeek.day === 5 ? dayInWeek.dayName = "Fri" : 
    dayInWeek.day === 6 ? dayInWeek.dayName = "Sat" :
    dayInWeek.dayName = "day"
    )
  ////////////////////////////////////////////////////////////////////////////////Method of finding determing which day it is
    
    console.log(thisWeek)

  //////////////////////////////////////////////This was before I created an api that pulls events from the users account. This api method returns the events of every single user
/*     async function getData() {
      const res = await fetch("api/readEvents")
      let data = await res.json()
      setEventList(data)
    } */
  //////////////////////////////////////////////This was before I created an api that pulls events from the users account. This api method returns the events of every single user

  //////////////////////////////////////////////////////This api method only returns the events of the user
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
  //////////////////////////////////////////////////////This api method only returns the events of the user

    console.log(yourEvents)
    
  ////////////////////////////////////////////////////////////////////////////////////After all of the components on the page loads, the page will check if the current user is loggedin and will get the events of that user (please refresh the page first. There is a bug that displays the events of the previous user unless the user refreshes the page. I am working on this bug)
    useEffect(() => {
      localStorage.getItem("userID") && getYourData(localStorage.getItem("userID"))
    }, [])
  ////////////////////////////////////////////////////////////////////////////////////After all of the components on the page loads, the page will check if the current user is loggedin and will get the events of that user (please refresh the page first. There is a bug that displays the events of the previous user unless the user refreshes the page. I am working on this bug)

  ///////////////////////////////////////////////////////////////////////////////////////Filters the events and returns events that are planned for thisWeek
    yourEvents ? filteredEvents = thisWeek.map(dayInWeek => yourEvents.filter(anEvent => 
      anEvent.data.monthName === dayInWeek.month && anEvent.data.year === dayInWeek.year && anEvent.data.day === dayInWeek.date)) : filteredEvents = []
    ///////////////////////////////////////////////////////////////////////////////////////Filters the events and returns events that are planned for thisWeek


    console.log(filteredEvents)

    ///////////////////////////////////////////////////////////////////Because the filteredEvents is a Nested Array, each event needs to be put into one array. That new array is called weeksEvents
    filteredEvents.map(one => one.map(each => weeksEvents.push(each)))
    ///////////////////////////////////////////////////////////////////Because the filteredEvents is a Nested Array, each event needs to be put into one array. That new array is called weeksEvents
    

    console.log(weeksEvents)
    console.log(filteredEvents)
    /////////////////////////////////////////////////////////////////Testing method to see if I can display the id of each event
    weeksEvents.map(anEvent => console.log(anEvent.ref['@ref'].id))
    /////////////////////////////////////////////////////////////////Testing method to see if I can display the id of each event


    ///////////////////////////////////////////////////////////////////////////////////////////////////Method to assign each start time as an event in AM if they are before noon. However I did not make a method for PM besides noon
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
      anEvent.data.start.slice(0, 2) === "12" ? anEvent.data.start = anEvent.data.start + " " + "PM" :
      console.log("impossible time")
    })
    ///////////////////////////////////////////////////////////////////////////////////////////////////Method to assign each start time as an event in AM if they are before noon. However I did not make a method for PM besides noon

    weeksEvents.sort(anEvent => anEvent.data.day)

    /////////////////////////////////////////////////////////////////////////api method to delete event
    async function deleteEvent(id){
      let deleteOption = confirm("do you really want to delete this event?")
      deleteOption &&
      await fetch("api/deleteEvent", {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({data: id})
      }).then(() => setDeletedItem(id))
      .catch(error => console.log(error))
    }
    /////////////////////////////////////////////////////////////////////////api method to delete event

    console.log("deletedItem: " + deletedItem)

    //////////////////////////////////////////////////////////////////////////////////////Removes deletedEvent from page without having to refresh
    weeksEvents = weeksEvents.filter(anEvent => anEvent.ref['@ref'].id !== deletedItem)
    //////////////////////////////////////////////////////////////////////////////////////Removes deletedEvent from page without having to refresh
    
    var day
    date.toString().length === 1 ? day = "0" + date.toString() : day = date

    const [todayInputValue, setTodayInputValue] = useState(year + "-" + possibleNewMonth + "-" + day)

    console.log("todayInputValue: " + todayInputValue)

    console.log(todayInputValue.split("-")[1])
    console.log("'" + todayInputValue.split("-")[1] + "-" + todayInputValue.split("-")[2] + "-" + todayInputValue.split("-")[0] + "'")
    console.log("Test problem: " + new Date("'" + todayInputValue.split("-")[1] + "-" + todayInputValue.split("-")[2] + "-" + todayInputValue.split("-")[0] + "'"))
 
 
 
    return (
    <>
      <Nav />
      <h1 style={{color: "#292E3B"}}>Dashboard</h1>
      <input className={styles.dateSelector} type="date" value={todayInputValue} onChange={(event) => {
        setToday(new Date(event.target.value.split("-")))
        setTodayInputValue(event.target.value)
      }} />
      
      <p>login/register and then Select any Date to create an Event (You can change the date of your event so feel free to select any date shown below)</p>
      {/*                                   method to highlight current Date                                                    */}
      {thisWeek && thisWeek.map(eachDay => 
          eachDay.date !== date ? 
          <Link href={{pathname: '/create', query: { year: eachDay.year, month: eachDay.numMonth, day: eachDay.date}}}>
            <a href="/create">
              <div className={styles.card}>
                <h1>{eachDay.date}</h1>
                <h2>{eachDay.dayName}</h2>
                <h5 className={styles.month}>{eachDay.month}</h5>
              </div>
            </a>
          </Link>
          :
          <Link href={{pathname: '/create', query: { year: eachDay.year, month: eachDay.numMonth, day: eachDay.date}}}>
            <div style={{backgroundColor: "#1b1e27"}} className={styles.card}>
              <h1 style={{color: 'white'}}>{eachDay.date}</h1>
              <h2 style={{color: 'white'}}>{eachDay.dayName}</h2>
              <h5 className={styles.month}>{eachDay.month}</h5>
            </div>
          </Link>
        
      )}
      {/*                                   method to highlight current Date                                                    */}

      <h1 style={{color: "#292E3B"}}>Events</h1>
      {weeksEvents && weeksEvents.map(anEvent =>
          <div style={{verticalAlign: "middle"}} className={styles.eventCard}>
            <h2>{anEvent.data.day}</h2>
            <Link href={`/test?title=${anEvent.ref['@ref'].id}`}><p style={{fontSize: "14px"}}>{anEvent.data.event}</p></Link>
            <p style={{fontSize: "14px"}}>{anEvent.data.start} - {anEvent.data.end}</p>
            <h5 className={styles.month}>{anEvent.data.monthName}</h5>
            <div style={{justifyContent: "center", display: "flex"}}>
              <svg onClick={() => deleteEvent(anEvent.ref['@ref'].id)} className={styles.options} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
    </>
  )
}
