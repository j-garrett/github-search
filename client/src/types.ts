export interface QueryObject {
    description: string
    language: string
    name: string
}

export interface DefaultQuery {
    default: string
}

export interface ISearchInputs {
    languages: string[]
    onSubmit: (formData: DefaultQuery | QueryObject) => void
}

export type Sorts = 'score' | 'score' | 'stargazers_count' | 'stargazers_count'

export interface IResponseItem {
    description: string
    name: string
    id: number
    language: string
    owner: { login: string }
    score: number
    stargazers_count: number
}

export interface IResponse {
    incomplete_results: boolean
    items: IResponseItem[]
    total_count: number
}
export interface INormalized {
    description: string
    name: string
    id: number
    language: string
    owner: { login: string }
    score: number
    stars: number
}
