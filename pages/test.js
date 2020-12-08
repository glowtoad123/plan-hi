const { useRouter } = require("next/router");
import React, { useEffect } from 'react'

export default function test({title}) {

    var split8 
    title ? split8 = title.split('8') : split8 = ""

    console.log(split8)

    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({data: title})
    }

    async function receiveData(){
        const res = await fetch('api/getEvent', requestOptions)
        let data = await res.json()
        console.log(data)
    }

    useEffect(() => {receiveData()}, [])

    return (
        <div>
            {title}
        </div>
    )
}


export async function getServerSideProps(context){

    return {props: {title: context.query.title}}
}
