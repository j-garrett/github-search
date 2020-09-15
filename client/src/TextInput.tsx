import React from 'react'

interface IProps {
    children: string
    onChange: (val: string) => void
    value: string
}
const genericOnChange = (callback: (val: string) => void) => (
    e: React.ChangeEvent<HTMLInputElement>
) => callback(e.target.value)

const TextInput = ({ children, onChange, value }: IProps) => (
    <label>
        {children}:
        <input type="text" value={value} onChange={genericOnChange(onChange)} />
    </label>
)

export default TextInput
