import React from 'react'

const SimpleTable = (props) =>{
    console.log(props.data)
    const fields = Object.keys(props.headers)
    const headers = Object.values(props.headers)

    const headersScript = headers.map(header => {
        return <th>{header}</th>
    })

    const rows = props.data.map(item => {
        return (
            <tr>
                {
                    fields.map(field => {
                        return <td>{item[field]}</td>
                    })
                }
            </tr>
        )
    })
    return (
        <table>
            <thead>
                <tr>
                    {headersScript}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default SimpleTable