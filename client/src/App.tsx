import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './css/App.css'
import Home from './Home'
import Details from './Details'
import NoMatch from './NoMatch'

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <header className="app-header">
                        GitHub Repo Search
                        <nav>
                            <ul>
                                <li>
                                    <Link
                                        data-testid="home-link"
                                        className="app-link"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        data-testid="details-link"
                                        className="app-link"
                                        to="/details"
                                    >
                                        Details
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/details">
                            <Details />
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
