import React, { createContext, useContext, useState } from 'react'
import faunadb, { Client, query } from 'faunadb'

const faunaContext = createContext()

export function useFauna(){
    return useContext(faunaContext)
}



export function faunaProvider({children}) {

    const [account, setAccount] = useState({
        email: "",
        password: "",
    })
    
    const q = query
    const client = new Client({secret: 'fnAD78kV2eACAgU-gPzu-xXGDI8vFW0M8GsLREYY'})

    console.log("testing: " + process.env.NEXT_FAUNA_KEY)
    const secret = 'fnAD78kV2eACAgU-gPzu-xXGDI8vFW0M8GsLREYY'

    
    async function register(email, password) {
        try {
            const dbs = await q.Create(
                q.Collection("accounts"), {
                    data: {
                        email: email,
                        password: password
                    }
                }
                ).then(ret => setAccount({
                    email: ret.data.email,
                    password: ret.data.password
                }))
            } catch(error) {
            console.log(error)
            alert("there has been a problem in setting up your account")
        } finally {
            console.log("moving on")
        }
    }
    
    async function login(email, password) {
         try {
            const dbs = await q.Get(
                q.Match(
                    q.Index('getAccount'), email, password
                    )
            ).then(ret => setAccount({
                email: ret.data.email,
                password: ret.data.password
            }))
        } catch(error) {
            console.log(error)
            alert("won't work")
        }
    }
    
    const values = {
        q,
        client,
        account,
        secret,
        register,
        login,
    }

    return(
        <>
            <faunaContext.Provider value={values}>
                {children}
            </faunaContext.Provider>
        </>
    )
}
