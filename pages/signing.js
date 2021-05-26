import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import * as localForage from 'localforage'

export default function signing() {
    const router = useRouter()
    async function getId(){
        let userID = await localForage.getItem('userID').then(value => value).catch(err => console.log(err)).finally(() => console.log("nothing"))
        return userID
      }
    useEffect(() => {
        getId()
        router.push("/")
    }, [])
    return (
        <div>
            redirecting...
        </div>
    )
}
