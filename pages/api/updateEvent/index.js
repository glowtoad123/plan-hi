const { Q, cli } = require("../../../services/fauna")



module.exports = async function(req, res) {
    const q = Q
    const client = cli
    const formData = req.body.data

    try{
        const dbs = await client.query(
            q.Update(
                q.Ref(
                    q.Collection("plannedEvents"), formData.eventID
                    ),
                {data: {
                    event: formData.event,
                    date: formData.date,
                    month: formData.month,
                    monthName: formData.monthName,
                    day: formData.day,
                    year: formData.year,
                    start: formData.start,
                    end: formData.end,
                    startNum: formData.startNum,
                    endNum: formData.endNum,
                    userID: formData.userID
                }}
            )
        )
        res.status(200).json(dbs.data)
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}