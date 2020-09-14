import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface IResponse {
    items: {}[]
    incomplete_results: boolean
    total_count: number
}

const Home = () => {
    const [repoResults, setRepoResults] = useState<IResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        axios
            .get(`/api`, { cancelToken: source.token })
            .then((res: { data: IResponse }) => {
                setRepoResults(res.data)
            })
            .catch(() => {
                setError(
                    'There was an issue with your request. Please try again or reload the page.'
                )
            })
            .finally(() => {})
        return () => {
            // need to cancel the request in case we unmount early
            source.cancel('there was an error')
        }
    }, [])
    return (
        <div data-testid="home-page-container" className="home-page">
            <header className="home-page-header">
                <h1>Home</h1>
            </header>
            {error && <h2>{error}</h2>}
            {repoResults && <h2>Results count: {repoResults.total_count}</h2>}
        </div>
    )
}

export default Home
