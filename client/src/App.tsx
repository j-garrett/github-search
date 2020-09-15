import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './css/App.css'
import Home from './Home'
import Details from './Details'
import NoMatch from './NoMatch'

import { IResponse, IResponseItem } from './types'

// [TODO] Normalize Result so we can store a subset of values in local storage
// const normalizeResult = (res: IResponseItem): INormalized => ({
//     description: res.description,
//     name: res.name,
//     id: res.id,
//     language: res.language,
//     owner: res.owner,
//     score: res.score,
//     stars: res.stargazers_count,
// })

function App() {
    // repoResults will be the source of truth we then filter and sort and reset with
    const [repoResults, setRepoResults] = useState<IResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [selected, setSelected] = useState<IResponseItem | null>(null)
    return (
        <div className="App">
            <Router>
                <div>
                    <header className="app-header">
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                            }}
                            data-testid="home-link"
                            className="app-link"
                            to="/"
                        >
                            GitHub Repo Search
                        </Link>
                        <nav>
                            <Link
                                data-testid="home-link"
                                className="app-link"
                                to="/"
                            >
                                Home
                            </Link>
                        </nav>
                    </header>
                    <Switch>
                        <Route exact path="/">
                            <Home
                                repoResults={repoResults}
                                error={error}
                                setRepoResults={setRepoResults}
                                setError={setError}
                                setSelected={setSelected}
                            />
                        </Route>
                        <Route path="/details">
                            <Details selected={selected} />
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
