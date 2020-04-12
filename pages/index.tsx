import useSwr from 'swr'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Layout from '../containers/layout/Layout'
import { dailyTrend } from './types/dailyTrend'
import TrendBox from '../containers/layout/trends/trendBox/TrendBox'
import TrendSearch from '../containers/layout/TrendSearch/TrendSearch'

type indexProps = {
    trends: Array<any>;
}

export type searchParamsType = {
    startDate: Date;
    endDate: Date;
    geo: string;
}

const fetcher = url => fetch(url).then(res => res.json())
const Index = (props: indexProps) => {

    const [dailyTrendArray, setDailyTrendArray] = useState<Array<dailyTrend>>([])

    const [searchParams, setSearchParams] = useState<searchParamsType>({
        startDate: moment().subtract(7, 'd').toDate(),
        endDate: moment().toDate(),
        geo: 'US'
    })

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(`/api/trends/date?start=${searchParams.startDate.toISOString()}&end=${searchParams.endDate.toISOString()}&geo=${searchParams.geo}`)
            setDailyTrendArray(res.data.dailyTrends)
        }
        fetchData()

    }, [searchParams])
    return (
        <Layout>
            {/* {props.trends.map((trend, idx) => <p key={idx}>{trend.date}</p>)} */}
            {/* {JSON.stringify(dailyTrendArray)} */}
            <TrendSearch setSearchParams={(searchParams: searchParamsType) => setSearchParams(searchParams)} />
            <div className="daily-trends-container">
                {dailyTrendArray.map((dailyTrend, index) => {
                    return (
                        <TrendBox key={index} dailyTrendData={dailyTrend} />
                    )
                })}
            </div>

            <style jsx>{`
                .daily-trends-container {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    justify-content: flex-start;
                    margin: 0;
                    width: 100%;
                }
            `}</style>
        </Layout>

    )
}

// Index.getInitialProps = async (): Promise<indexProps> => {
//     const response = await fetch('http://localhost:3000/api/trends/today')
//     console.log('1111111111111111')
//     console.log(response)
//     const data = await response.json()
//     console.log(2222222222222222222222)
//     console.log(data)
//     return {
//         trends: data
//     }
// }

export default Index