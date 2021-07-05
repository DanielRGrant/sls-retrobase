import { Link } from 'react-router-dom'
const NoFilesSubmitted = () => {
    return (
        <div>
            <p><b>No Files Submitted</b></p>
            <p>Use the <Link to={{
                "state": {"uploadTe": true},
                "pathname": "/query",
            }}>Query</Link> tool to submit files for analysis</p>
        </div>
    )
}

export default NoFilesSubmitted