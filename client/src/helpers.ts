import axios from 'axios'

import { DefaultQuery, IResponse, QueryObject } from './types'

export const getApiResults = (
    query: DefaultQuery | QueryObject,
    onSuccess: Array<(res: IResponse) => void>,
    setError: (err: string) => void
) => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    axios
        .get(`/api`, {
            cancelToken: source.token,
            params: query,
        })
        .then((res: { data: IResponse }) => {
            onSuccess.forEach(func => func(res.data))
        })
        .catch(() => {
            setError(
                'There was an issue with your request. Please try again or reload the page.'
            )
            source.cancel('there was an error')
        })
        .finally(() => {})
    return () => {
        // need to cancel the request in case we unmount early
        source.cancel('there was an error')
    }
}
