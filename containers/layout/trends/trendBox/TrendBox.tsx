import React from 'react'
import { dailyTrend } from '../../../../types/dailyTrend'
import styles from './TrendBox.module.scss'
import { countries } from '../../../../constants/constants'

type TrendBoxProps = {
    dailyTrendData: dailyTrend;
}

const TrendBox = ({ dailyTrendData }: TrendBoxProps) => {
    const country = countries.find(e => e.code === dailyTrendData.geo)
    return (
        <div className={styles.dailyTrendBox}>
            <div className={styles.dailyTrendsHeader}>
                <h2>{new Date(dailyTrendData.date).toDateString()}</h2>
                <h4>Country: {country.name}</h4>
            </div>
            <div className="daily-trends-content">
                <ul>
                    {dailyTrendData.trendingSearches.map((topic, idx) => (
                        <li key={idx}>
                            <span>{`${idx + 1}. ${topic}`}</span>
                            <div>
                                <a href={`https://trends.google.com/trends/explore?q=${topic.replace(' ', '%20')}&date=now%207-d&geo=${dailyTrendData.geo}`} target="_blank">{' '}<i className="fa fa-history"></i></a>
                                <a href={`http://google.com/#q=${topic.replace(' ', '+')}`} target="_blank"><i className="fa fa-search"></i></a>
                            </div>

                        </li>))}
                </ul>
            </div>

        </div>
    )
}

export default TrendBox
