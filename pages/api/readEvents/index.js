const { Q, cli } = require("../../../services/fauna")

module.exports = async function(req, res){
    const q = Q
    const client = cli

    try {
        const dbs = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('allEvents')
                    ),
                    (ref) => q.Get(ref)
                )
            )
        )
        res.status(200).json(dsb.data)
    }catch(error) {
        res.status(500).json({Error: error, message})
    }
}