import React from 'react'
import { render } from '@testing-library/react'
import Details from './../Details'

test('renders', () => {
    const { getByTestId } = render(<Details />)
    expect(getByTestId('details-page-container')).toBeInTheDocument()
})
