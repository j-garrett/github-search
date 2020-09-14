import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './css/App.css'
import Home from './Home'
import Details from './Details'

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
                                    <Link className="app-link" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link className="app-link" to="/details">
                                        Details
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </header>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/details">
                            <Details />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App
