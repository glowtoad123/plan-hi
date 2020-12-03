import React, { createContext, useContext, useState } from 'react'
import faunadb, { Client, query } from 'faunadb'

const q = query
const client = new Client({secret: 'fnAD78kV2eACAgU-gPzu-xXGDI8vFW0M8GsLREYY'})
const account = {}

export function login(email, password) {
    try {
        const dbs = client.query(q.Get(
            q.Match(
                q.Index('getAccount'), email, password
                )
        )).then(ret => {
            account.email = ret.data.email
            account.password = ret.data.password
            account.id = ret.ref.id
            localStorage.setItem("userID", ret.ref.id)
            /* document.cookie = `userId=${ret.ref.id}` */
        })
    } catch(error) {
        console.log(error)
        alert("won't work")
    }
}

export function register(email, password) {
    try {
        const dbs = client.query(q.Create(
            q.Collection("accounts"), {
                data: {
                    email: email,
                    password: password
                }
            }
            )).then(ret => {
                account.email = ret.data.email
                account.password = ret.data.password
                account.id = ret.ref.id
                localStorage.setItem("userID", ret.ref.id)
                /* document.cookie = `userId=${ret.ref.id}` */
            })
        } catch(error) {
        console.log(error)
        alert("there has been a problem in setting up your account")
    } finally {
        console.log(client)
        console.log("moving on")
    }
}

export const secret = 'fnAD78kV2eACAgU-gPzu-xXGDI8vFW0M8GsLREYY'

export const accountCred = account

export const Q = q
export const cli = client
