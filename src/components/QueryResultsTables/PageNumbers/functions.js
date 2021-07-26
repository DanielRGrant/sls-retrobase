import axios from 'axios'
const config = require('../../../jsconfig.json')

export function startEndPaginateLinks({ pagesCutOff, numPages, currentPage }) {
    //Calculates cutoffs for page number links
    var start,
        end,
        ceiling = Math.ceil(pagesCutOff / 2),
        floor = Math.floor(pagesCutOff / 2);
    if (numPages < pagesCutOff) {
        start = 1;
        end = numPages;
    } else if (currentPage >= 1 && currentPage <= ceiling) {
        start = 1;
        end = pagesCutOff;
    } else if ((currentPage + floor) >= numPages) {
        start = (numPages - pagesCutOff);
        end = numPages;
    } else {
        start = (currentPage - floor);
        end = (currentPage + ceiling);
    }
    return [start, end]
}

export const getPage = async (e, {currentPage, key, filters, setRespData, sortBy, setLoading}) => {
    const getPageUrl = config.queryApiUrl + "/query-return-page"
    var newPage
    switch (e.target.id) {
        case "prev":
            newPage = currentPage - 1
            break
        case "next":
            newPage = currentPage + 1
            break
        default:
            newPage = Number(e.target.id)
    }
    const params = {
        params: {
            "page": newPage,
            "key": key,
            ...filters,
            "sort_by": sortBy.col,
            "desc": sortBy.desc
        }
    }
    setLoading(true)
    const resp = await axios.get(getPageUrl, params)
    const tmpRespData = JSON.parse(resp.data.body)
    setRespData(tmpRespData)
}