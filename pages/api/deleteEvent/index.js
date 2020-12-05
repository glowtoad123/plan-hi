const { Q, cli } = require("../../../services/fauna")

module.exports = async function(req, res){
    const q = Q
    const client = cli
    console.log("daya: " + req.body.data)
    try {
        const dbs = await client.query(
            q.Delete(
                q.Ref(q.Collection("plannedEvents"), req.body.data)
                )/* ,
                (ref) => q.Get(ref) */
                )
        res.status(200).json(dbs.data)
    }catch(error) {
        res.status(500).json({Error: error.message})
    }
}