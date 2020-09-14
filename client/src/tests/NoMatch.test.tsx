import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import NoMatch from './../NoMatch'

test('renders', () => {
    const { getByTestId } = render(
        <Router>
            <NoMatch />
        </Router>
    )
    expect(getByTestId('no-match-page-container')).toBeInTheDocument()
})
