
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const dailyTrendSchema = new Schema({
    date: Date,
    trendingSearches: [String],
    geo: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: Date
});


let DailyTrend
try {
    DailyTrend = mongoose.model('DailyTrend')
} catch (error) {
    DailyTrend = mongoose.model('DailyTrend', dailyTrendSchema)
}

export default DailyTrend