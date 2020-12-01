import React, { useEffect, useState } from 'react'
import { dateList } from '../components/microcomponents/dates'
import Nav from '../components/nav'
import { Fauna, login, register, secret } from '../services/fauna'
import { faunaProvider, useFauna } from '../services/faunaold'
import styles from '../styles/Home.module.css'

export default function Home() {

  useEffect(() => {console.log(document.cookie)}, [])

  const date = new Date('December 17, 1995 03:24:00')
  const year = dateList[date.getFullYear()].filter(property => property.numMonth === date.getUTCMonth())


  console.log(date.getFullYear())
  console.log(date.getMonth())
  console.log(year)

  return (
    <faunaProvider>
      <Nav />
    </faunaProvider>
  )
}
