import { fetchPageData } from '../../functions/functions'
const config = require('../../config.json');

export const fetchData = async function ({ token, history, setData, fileId }) {
    const fetchDataInput = {
        headersParams: {
            "params": { "file_id": fileId },
            "headers": {
                Authorization: `Bearer ${token}`
            }
        },
        requestUrl: `${config.queryApiUrl}/mzid-get-results`,
        errorUrl: "/error",
        history: history
    }

    fetchPageData(fetchDataInput)
        .then(res => {
            setData(res.body)
        })
}