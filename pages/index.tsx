import useSwr from 'swr'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Layout from '../containers/layout/Layout'
import TrendBox from '../containers/layout/trends/trendBox/TrendBox'
import TrendSearch from '../containers/layout/TrendSearch/TrendSearch'
import styles from './index.module.scss'
import { searchParamsType } from '../types/searchParamsType'
import DailyTrend from '../models/DailyTrend'
import mongoose from 'mongoose'

type indexProps = {
    dailyTrends: any;
    initialKey: string;
}

function buildKey(searchParams: searchParamsType) {
    return `/api/trends/date?start=${searchParams.startDate.toISOString()}&end=${searchParams.endDate.toISOString()}&geo=${searchParams.geo}`
}

const fetcher = url => axios.get(url).then(res => res.data)
const Index = (props: indexProps) => {

    function setSearchParamsAndKey(newSearchParams: searchParamsType) {
        setSearchParams(newSearchParams)
        setKey(buildKey(newSearchParams))
    }
    const [searchParams, setSearchParams] = useState<searchParamsType>({
        startDate: moment().subtract(7, 'd').toDate(),
        endDate: moment().toDate(),
        geo: 'US'
    })
    const dailyTrends = JSON.parse(props.dailyTrends)
    const [key, setKey] = useState(props.initialKey)

    const {data, error} = useSwr(key, fetcher, {
        initialData: key === props.initialKey ? {dailyTrends} : null
    })
    
    
    return (
        <Layout>
            <TrendSearch setSearchParams={(searchParams: searchParamsType) => setSearchParamsAndKey(searchParams)} />

            <div className={styles.dailyTrendsContainer}>
                {error ? <h1>Error</h1> : data ? data.dailyTrends.map((dailyTrend, index) => <TrendBox key={index} dailyTrendData={dailyTrend} />) : <h1>loading</h1>}
            </div>
        </Layout>

    )
}

export async function getServerSideProps(context) {
    const searchParams = {
        startDate: moment().subtract(7, 'd').toDate(),
        endDate: moment().toDate(),
        geo: 'US'
    }
    if (mongoose.connection.readyState !== 1) {
        mongoose.connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
    }
    const geo = searchParams.geo
    const start = searchParams.startDate.toISOString()
    const end = searchParams.endDate.toISOString()

    const dailyTrends = await DailyTrend.find({ date: { $gte: start, $lte: end }, geo: geo })
    const initialKey = buildKey(searchParams)
    return {
        props: {dailyTrends: JSON.stringify(dailyTrends), initialKey}
    }
}

export default Index