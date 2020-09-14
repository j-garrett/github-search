import React from 'react'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import Home from './../Home'

let mockAPI: MockAdapter
let mock: jest.SpyInstance

beforeEach(() => {
    mockAPI = new MockAdapter(axios)
    mockAPI.onGet('/api').reply(200, {
        total_count: 20,
        incomplete_results: false,
        items: [],
    })
    mock = jest.spyOn(axios, 'get')
})

test('renders', async () => {
    const { getByTestId } = render(<Home />)
    await act(async () => {
        await waitFor(() =>
            expect(getByTestId('home-page-container')).toBeInTheDocument()
        )
    })
})

test('fetches from api successfully', async () => {
    const { getByText } = render(<Home />)
    await act(async () => {
        await waitFor(() => expect(mock).toBeCalled())
        await waitFor(() =>
            expect(getByText(/Results count: 20/i)).toBeInTheDocument()
        )
    })
})

test('notifies user when error', async () => {
    mockAPI.onGet('/api').timeout()
    const { getByText, container } = render(<Home />)
    await act(async () => {
        await waitFor(() => {
            expect(
                getByText(
                    'There was an issue with your request. Please try again or reload the page.'
                )
            ).toBeInTheDocument()
        })
    })
})
