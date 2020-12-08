const { useRouter } = require("next/router");
import { Client } from 'faunadb';
import React, { useEffect } from 'react'
import { cli, Q } from '../services/fauna';


export default function test({data}) {

    console.log(data)

    return (
        <div>
            {data.event}
            {data.monthName}
        </div>
    )
}

export async function getServerSideProps(context) {
    const title = context.query.title

    console.log("title", title)

    const q = Q
    const client = cli
        const dbs = await client.query(
            q.Get(
                q.Ref(q.Collection("plannedEvents"), title)
                )
        )


    return {props: {data: dbs.data}}

}
