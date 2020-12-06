const { Q, cli } = require("../../../services/fauna")



module.exports = async function(req, res) {
    const q = Q
    const client = cli
    const formData = req.body.data

    try{
        const dbs = await client.query(
            q.Create(
                q.Collection("plannedEvents"), {
                    data: {
                        event: formData.event,
                        date: formData.date,
                        start: formData.start,
                        end: formData.end,
                        startNum: formData.startNum,
                        endNum: formData.endNum,
                        userID: formData.userID,
                        month: formData.month,
                        monthName: formData.monthName,
                        year: formData.year,
                        day: formData.day
                    }
                }
            )
        )
        res.status(200).json(dbs.data)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}