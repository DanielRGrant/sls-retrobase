import { fetchPageData } from "../../functions/functions"
const config = require('../../jsconfig.json')


const fetchData = async function (token, history, setData) {
    const accountRequestInput = {
        headersParams: {
            "params": {},
            "headers": {
                Authorization: `Bearer ${token}`,
            }
        },
        requestUrl: `${config.queryApiUrl}/mzid-check-progress/`,
        errorUrl: "/error",
        history: history
    }
    const data = await fetchPageData(accountRequestInput)
    if (data) setData(data.body)
}

const FileAnalysisProgress = (props) => {

    return (
        <div>
            <div>
                <>{props.actionsMenu}</>
                <button 
                    onClick={() => fetchData(props.token, props.history, props.setData)}
                >
                    Refresh
                </button>
            </div>
            <div className="querytable">
                {props.dataTable}
            </div>
            <div className="page-numbers-container">{props.pageLinks}</div>
            <span>Items per page: {props.itemsPerPage}</span>
        </div>
    )
}


export default FileAnalysisProgress