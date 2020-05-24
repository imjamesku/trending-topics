import useSwr from 'swr'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Layout from '../containers/layout/Layout'
import { dailyTrend } from '../types/dailyTrend'
import TrendBox from '../containers/layout/trends/trendBox/TrendBox'
import TrendSearch from '../containers/layout/TrendSearch/TrendSearch'
import styles from './index.module.scss'
import { searchParamsType } from '../types/searchParamsType'
import DailyTrend from '../models/DailyTrend'

type indexProps = {
    trends: Array<any>;
    data: any
}

const fetcher = url => axios.get(url).then(res => res.data)
const Index = (props: indexProps) => {


    const [searchParams, setSearchParams] = useState<searchParamsType>({
        startDate: moment().subtract(7, 'd').toDate(),
        endDate: moment().toDate(),
        geo: 'US'
    })

    const {data, error} = useSwr(`/api/trends/date?start=${searchParams.startDate.toISOString()}&end=${searchParams.endDate.toISOString()}&geo=${searchParams.geo}`, fetcher)
    
    return (
        <Layout>
            <TrendSearch setSearchParams={(searchParams: searchParamsType) => setSearchParams(searchParams)} />

            <div className={styles.dailyTrendsContainer}>
                {error ? <h1>Error</h1> : data ? data.dailyTrends.map((dailyTrend, index) => <TrendBox key={index} dailyTrendData={dailyTrend} />) : <h1>loading</h1>}
            </div>
        </Layout>

    )
}

export default Index