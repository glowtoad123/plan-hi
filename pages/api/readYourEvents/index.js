const { useEffect, useState } = require("react")
const { Q, cli } = require("../../../services/fauna")

module.exports = async function(req, res){
    const q = Q
    const client = cli

    var yourKey = req.body.id

    try {
        const dbs = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('yourEvents'), yourKey
                    )
                    ),
                    (ref) => q.Get(ref)
            )
        )
        res.status(200).json(dbs.data)
    }catch(error) {
        res.status(500).json({Error: error.message})
    }
}