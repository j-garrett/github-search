import React, { useState } from 'react'
import TextInput from './TextInput'
import { ISearchInputs } from './types'

const defaultExample = 'jquery in:name'

const SearchInputs = ({ languages, onSubmit }: ISearchInputs) => {
    const [searchText, setSearchText] = useState<string>(defaultExample)
    const [name, setRepoName] = useState<string>('scary')
    const [description, setDescription] = useState<string>('fun')
    const [language, setLanguage] = useState<string>('CSS')
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        onSubmit({ default: searchText })
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}
                    >
                        <a href="Follows query values from https://docs.github.com/en/github/searching-for-information-on-github/searching-for-repositories">
                            Follow these directions for creating a default
                            search query.
                        </a>
                        <TextInput onChange={setSearchText} value={searchText}>
                            Default query build
                        </TextInput>
                    </div>
                    <input style={{ maxWidth: '200px' }} type="submit" />
                </form>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        const query = {
                            name,
                            description,
                            language,
                        }
                        onSubmit(query)
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}
                    >
                        <p>Or build a query using these additive inputs</p>
                        <TextInput onChange={setRepoName} value={name}>
                            Search for Repository Name
                        </TextInput>
                        <TextInput
                            onChange={setDescription}
                            value={description}
                        >
                            Search for Repository Description
                        </TextInput>
                        <TextInput onChange={setLanguage} value={language}>
                            Search by Language
                        </TextInput>
                    </div>
                    <input style={{ maxWidth: '200px' }} type="submit" />
                </form>
            </div>
        </>
    )
}

export default SearchInputs
