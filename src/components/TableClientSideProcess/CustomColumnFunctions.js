import { Link } from 'react-router-dom'


export function linkIfOtherColEq({ fieldValue, columnHeader, entry }, linkTo, refCol) {
    const fieldScript = (
        entry[refCol] === "complete"
            ? <td><Link to={linkTo + fieldValue}>{fieldValue}</Link></td>
            : <td><span>{fieldValue}</span></td>
    )
    return fieldScript
}

export function customClasses({ fieldValue, columnHeader}, params) {
    const textToMatch = Object.keys(params)
    const fieldScript = (
        <td style={{color: textToMatch.includes(fieldValue) ? params[fieldValue] : ""}}>
            {fieldValue}
        </td>
    )
    return fieldScript
}

export function processDateTime({fieldValue}) {
    var localDate = new Date(fieldValue).toISOString();
    var localDate = localDate.replace("T", " ").split(".")[0]
    return <td>{localDate}</td>
}