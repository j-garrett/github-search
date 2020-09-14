import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
    const [repoResults, setRepoResults] = useState('...loading')
    const [error, setError] = useState('')
    useEffect(() => {
        axios
            .get(`/api`)
            .then((res: { data: 'string' }) => {
                setRepoResults(res.data)
            })
            .catch(() => {
                setError(
                    'There was an issue with your request. Please try again or reload the page.'
                )
            })
    }, [])
    return (
        <div className="home-page">
            <header className="home-page-header">
                <h1>Home</h1>
            </header>
            {error && <h2>{error}</h2>}
            {repoResults && <h2>{repoResults}</h2>}
        </div>
    )
}

export default Home
