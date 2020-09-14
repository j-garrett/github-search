import React from 'react'
import { useLocation } from 'react-router-dom'

const NoMatch = () => <h3>Could not find a page at {useLocation().pathname}</h3>

export default NoMatch
