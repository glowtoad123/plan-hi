import React, {useState, useRef} from 'react'
import { useRouter } from 'next/router'
import {accountCred, login, register} from '../services/fauna'
import Login from '../components/microcomponents/Login'
import Register from '../components/microcomponents/Register'

export default function Enter(){
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    console.log(accountCred)

    return(
        <>
            <Login 
                settingEmail={event => setEmail(event.target.value)} 
                settingPassword={event => setPassword(event.target.value)}
                authenticate={() => {
                    login(email, password)
                    router.push("/")
                }}
                password={password}
                email={email}
            />
            <Register 
                settingEmail={event => setEmail(event.target.value)} 
                settingPassword={event => setPassword(event.target.value)}
                authenticate={() => {
                    register(email, password)
                    router.push("/")
                }}
                email={email}
                password={password}
            />
        </>
    )
}