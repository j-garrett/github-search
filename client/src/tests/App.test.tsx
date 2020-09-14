import React from 'react'
import { act } from 'react-dom/test-utils'
import { BrowserRouter as Router } from 'react-router-dom'
import { waitFor } from '@testing-library/dom'
import { render, fireEvent, waitForDomChange } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import App from './../App'

const mockAPI = new MockAdapter(axios)
mockAPI.onGet('/api').reply(200, {
    total_count: 20,
    incomplete_results: false,
    items: [],
})

test('renders GitHub Repo Search header', async () => {
    const { getByText } = render(<App />)
    await act(async () => {
        await waitFor(() =>
            expect(getByText(/GitHub Repo Search/i)).toBeInTheDocument()
        )
    })
})

test('full app renders', async () => {
    const { getByTestId } = render(
        <Router>
            <App />
        </Router>
    )
    await act(async () => {
        await waitFor(() =>
            expect(getByTestId('home-page-container')).toBeInTheDocument()
        )
    })
})

test('navigating to home page', async () => {
    const { getByTestId } = render(
        <Router>
            <App />
        </Router>
    )
    await act(async () => {
        await waitFor(() =>
            expect(getByTestId('home-link')).toBeInTheDocument()
        )
        expect(getByTestId('home-page-container')).toBeInTheDocument()
    })
})

// [TODO] This test passes, but has a warning about updating unmounted components. Fix it.
test('navigating to details page', async () => {
    const { getByTestId } = render(
        <Router>
            <App />
        </Router>
    )
    await act(async () => {
        await waitFor(() =>
            expect(getByTestId('details-link')).toBeInTheDocument()
        )
        const leftClick = { button: 0 }
        fireEvent.click(getByTestId('details-link'), leftClick)
        await waitFor(() =>
            expect(getByTestId('details-page-container')).toBeInTheDocument()
        )
    })
})
