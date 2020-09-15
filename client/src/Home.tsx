import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    DefaultQuery,
    IResponse,
    IResponseItem,
    QueryObject,
    Sorts,
} from './types'
import { getApiResults } from './helpers'
import SearchInputs from './SearchInputs'

interface IProps {
    error: string | null
    repoResults: IResponse | null
    setError: (err: string) => void
    setRepoResults: (res: IResponse) => void
    setSelected: (item: IResponseItem) => void
}

const Home = ({
    error,
    repoResults,
    setError,
    setRepoResults,
    setSelected,
}: IProps) => {
    const [filteredResults, setFilteredResults] = useState<IResponseItem[]>([])
    const [sortedResults, setSortedResults] = useState<IResponseItem[] | null>(
        null
    )
    const [languages, setLanguages] = useState<string[]>([])
    const [sortBy, setSortBy] = useState<Sorts>('score')
    const history = useHistory()

    const submitSearch = (query: DefaultQuery | QueryObject) =>
        getApiResults(query, [setRepoResults], setError)

    const filterResults = (filter: string, key: 'language') => {
        if (repoResults && filter && filter !== 'all') {
            const filtered = repoResults.items.filter(
                (res: IResponseItem) => res[key] && res[key] === filter
            )
            setFilteredResults(filtered)
        } else if (repoResults) {
            setFilteredResults(repoResults.items)
        }
    }

    useEffect(() => {
        const newFiltered = [...filteredResults]
        setSortedResults(
            newFiltered.sort(
                (res: IResponseItem, res2: IResponseItem) =>
                    res2[sortBy] - res[sortBy]
            )
        )
    }, [sortBy, filteredResults])

    useEffect(() => {
        if (repoResults?.items) {
            const languages: any = {}
            repoResults.items.forEach(item => (languages[item.language] = 1))

            setFilteredResults(repoResults.items)
            setLanguages(
                Object.keys(languages)
                    .sort()
                    .filter(lan => lan !== 'null')
            )
        }
    }, [repoResults])

    return (
        <div data-testid="home-page-container" className="home-page">
            <header className="home-page-header">
                <h1>Home</h1>
            </header>
            <form>
                <label>
                    Sort By
                    <select
                        onChange={e => {
                            const val: Sorts = e.target.value as Sorts
                            setSortBy(val)
                        }}
                    >
                        <option value="score">score</option>
                        <option value="stargazers_count">stars</option>
                    </select>
                </label>
                {!!languages.length && (
                    <label>
                        Filter by language
                        <select
                            onChange={e =>
                                filterResults(e.target.value, 'language')
                            }
                        >
                            <option key="all" value="all">
                                Show All
                            </option>
                            {languages.map(lang => (
                                <option key={lang} value={lang}>
                                    {lang}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </form>
            <SearchInputs languages={languages} onSubmit={submitSearch} />
            {error && <h2>{error}</h2>}
            {sortedResults && <h2>Results count: {sortedResults.length}</h2>}
            {sortedResults?.map(res => (
                <div key={res.id}>
                    <hr />
                    <h2>Name: {res.name}</h2>
                    <h3>
                        {res[sortBy]}{' '}
                        {sortBy === 'stargazers_count'
                            ? 'Stars'
                            : 'Relevnace Score'}
                    </h3>
                    <button
                        onClick={e => {
                            history.push('/details')
                            setSelected(res)
                        }}
                    >
                        Details
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Home
