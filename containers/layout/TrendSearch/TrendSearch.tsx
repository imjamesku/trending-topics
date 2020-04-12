import React, { FormEvent, useState, ChangeEvent } from 'react'
import styles from './TrendSearch.module.scss'
import { searchParamsType } from '../../../types/searchParamsType'
import { countries } from '../../../constants/constants'
import moment from 'moment'

type Props = {
    setSearchParams: (searchParamsType) => void;
}

const TrendSearch = (props: Props) => {
    const [searchState, setSearchState] = useState<searchParamsType>({
        startDate: moment().subtract(7, 'd').toDate(),
        endDate: new Date(Date.now()),
        geo: 'US'
    })

    const search = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Check if the difference < 7 days
        if (Math.abs(moment(searchState.startDate).diff(moment(searchState.endDate), 'd')) <= 30) {
            props.setSearchParams(searchState)
        } else {
            window.alert("Start and end dates must be less than 30 days apart")
        }
    }

    return (
        <form onSubmit={search} className={styles.trendSearchForm}>
            <input type="date" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchState({ ...searchState, startDate: moment(e.target.value).toDate() })} name="start" id="start" value={moment(searchState.startDate).format('YYYY-MM-DD')} />
            <input type="date" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchState({ ...searchState, endDate: moment(e.target.value).toDate() })} name="end" id="end" value={moment(searchState.endDate).format('YYYY-MM-DD')} />
            <select name="geo" id="geo" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSearchState({ ...searchState, geo: e.target.value })} value={searchState.geo}>
                {countries.map(country => <option value={country.code}>{country.name}</option>)}
                {/* <option value="US">United States</option> */}
                {/* <option value="TW">Taiwan</option> */}
            </select>
            <input type="submit" className="btn-secondary" value="Search" />
        </form>
    )
}

export default TrendSearch
