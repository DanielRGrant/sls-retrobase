import axios from 'axios';
const config = require('../../../jsconfig.json');

export const sortByFun = async ({ e, respData, setRespData, lastFilters, colParams, sortBy, setSortBy }) => {
    const i = colParams.columnHeadersFinal.indexOf(e.currentTarget.textContent)
    const sortByCol = colParams.columnHeaders[i]
    const sortByUrl = config.queryApiUrl + '/query-sort-by'
    const params = {
        params: {
            ...lastFilters,
            "key": respData.key,
            "sort_by": sortByCol
        }
    }
    const resp = await axios.get(sortByUrl, params)
    setSortBy(sortByCol)
    const sortedRespData = JSON.parse(resp.data.body)
    setRespData(sortedRespData)
}