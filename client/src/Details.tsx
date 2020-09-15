import React from 'react'
import { IResponseItem } from './types'

interface IProps {
    selected: IResponseItem | null
}

const Details = ({ selected }: IProps) => (
    <div data-testid="details-page-container">
        <h1>Details Page</h1>
        {selected ? (
            <>
                <h2>Name: {selected.name || 'unknown'}</h2>
                <h2>Description: {selected.description || 'unknown'}</h2>

                <h2>Stars: {selected.stargazers_count || 'unknown'}</h2>
                <h2>Language: {selected.language || 'unknown'}</h2>
                <h2>Owner: {selected.owner.login || 'unknown'}</h2>
            </>
        ) : (
            <h2>Please return to home page and create a search first</h2>
        )}
    </div>
)

export default Details
