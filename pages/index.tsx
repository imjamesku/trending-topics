import useSwr from 'swr'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Layout from '../containers/Layout'

type indexProps = {
    trends: Array<any>;
}

type dailyTrend = {
    date: Date;
    geo: String;
    trendingSearches: [string];
}
const fetcher = url => fetch(url).then(res => res.json())
const Index = (props: indexProps) => {

    const [dailyTrendArray, setDailyTrendArray] = useState<Array<dailyTrend>>([])
    useEffect(() => {
        const fetchData = async () => {
            const end = new Date(Date.now()).toISOString()
            const res = await axios(`/api/trends/date?start=2020-04-05T00:00:00.000Z&end=${end}&geo=US`)
            console.log(res)

            setDailyTrendArray(res.data.dailyTrends)
        }
        fetchData()

    }, [])
    // const { data, error } = useSwr('/api/trends/date?start=2020-04-05T00:00:00.000Z&end=2020-04-06T00:00:00.000Z&geo=TW', fetcher)

    // if (error) return <div>Failed to load trends</div>
    // if (!data) return <div>Loading</div>

    // setDailyTrendArray([...data.dailyTrends])


    // console.log(data)
    return (
        <Layout>
            {/* {props.trends.map((trend, idx) => <p key={idx}>{trend.date}</p>)} */}
            {/* {JSON.stringify(dailyTrendArray)} */}
            <div className="daily-trends-container">
                {dailyTrendArray.map((dailyTrend, index) => {
                    return (
                        <div key={index} className="daily-trend-box">
                            <div className="daily-trends-header">
                                <h2>{new Date(dailyTrend.date).toDateString()}</h2>
                                <h3>Country: {dailyTrend.geo}</h3>
                            </div>
                            <div className="daily-trends-content">
                                <ul>
                                    {dailyTrend.trendingSearches.map((topic, idx) => (
                                        <li key={idx}>{`${idx}. ${topic}`}
                                            <a href={`https://trends.google.com/trends/explore?q=${topic.replace(' ', '%20')}&date=now%207-d&geo=US`} target="_blank">{' '}<i className="fa fa-search"></i></a>
                                        </li>))}
                                </ul>
                            </div>

                        </div>

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
                    /* background-color: blue; */
                    margin: 0;
                    width: 100%;
                }
                .daily-trend-box {
                    background-color: white;
                    margin: 0.5rem;
                    /* padding: 1rem; */
                    border-radius: 5px;
                    -webkit-box-shadow: 0px 0px 5px 0px rgba(171,171,171,0.61);
                    -moz-box-shadow: 0px 0px 5px 0px rgba(171,171,171,0.61);
                    box-shadow: 0px 0px 5px 0px rgba(171,171,171,0.61);
                    font-family: 'Mukta';
                }
                .daily-trends-header {
                    color: #fff;
                    background-color: #3B88FF;
                    padding: 10px 20px;
                    
                }
                .daily-trend-box ul {
                    list-style: none;
                    position: relative;
                    background: #fff;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    
                }
                .daily-trend-box ul li {
                    padding: 0.2rem 0.8rem;
                    /* width: 100%; */
                    background-color: #F7F7F7;
                    transition: transform 0.5s;
                }
                .daily-trend-box ul li:hover {
                    transform: scale(1.1);
                    z-index:100;
                    background: #3B88FF;
                    box-shadow: 0 5px 25px rgba(0, 0, 0, .1);
                    color: #fff;
                }
                li:nth-child(odd) {
                    /* background-color: #F1f1f1; */
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