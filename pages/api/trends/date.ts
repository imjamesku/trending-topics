import { NextApiRequest, NextApiResponse } from 'next'
import DailyTrend from '../../../models/DailyTrend'
import connectDb from '../../../middleware/database'
import nextConnect from 'next-connect'
import url from 'url'


const handler = nextConnect()
handler.use(connectDb)
// let cachedDb = null
// mongoose.connect(process.env.MONGODB_URI)
// async function connectToDatabase(uri: string) {
//     if (cachedDb) {
//         return cachedDb
//     }

//     console.log(`uri: ${uri}`)
//     const client = await MongoClient.connect(uri, { useNewUrlParser: true })
//     const db = await client.db(url.parse(uri).pathname.substr(1))

//     cachedDb = db
//     return db
// }

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const date = new Date(Date.now())
        // await mongoose.connect(process.env.MONGODB_URI)
        /*const db = await connectToDatabase(process.env.MONGODB_URI)

        const collection = await db.collection('dailytrends')

        const dailyTrends = await collection.find({ geo: "TW" }).toArray()*/
        // database(req, res)
        const geo = req.query.geo
        const start = Date.parse(<string>req.query.start)
        const end = Date.parse(<string>req.query.end)

        // console.log(`start: ${JSON.stringify(req.query)}`)

        const dailyTrends = await DailyTrend.find({ date: { $gte: start, $lte: end }, geo: geo })

        res.status(200).json({ dailyTrends })



    } catch (error) {
        console.log(error)
    }
})

export default handler