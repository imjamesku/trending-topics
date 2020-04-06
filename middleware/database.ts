import mongoose from 'mongoose'
import nextConnect from 'next-connect'

async function database(req, res, next) {
    if (mongoose.connection.readyState !== 1) {
        mongoose.connect(process.env.MONGODB_URI)
    }
    return next();
}

const middleware = nextConnect()

middleware.use(database)

export default middleware