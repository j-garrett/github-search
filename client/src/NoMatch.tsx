import React from 'react'
import { useLocation } from 'react-router-dom'

const NoMatch = () => (
    <div data-testid="no-match-page-container">
        <h3>Could not find a page at {useLocation().pathname}</h3>
    </div>
)

export default NoMatch
