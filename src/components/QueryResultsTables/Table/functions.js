import axios from 'axios';
import { Link } from 'react-router-dom';
const config = require('../../../config.json');


export async function sortByFun({ e, respData, setRespData, lastFilters, colParams, sortBy, setSortBy }) {
    const i = colParams.columnHeadersFinal.indexOf(e.currentTarget.textContent)
    const sortByCol = colParams.columnHeaders[i]
    const sortByUrl = config.queryApiUrl + '/query-sort-by'
    const params = {
        params: {
            ...lastFilters,
            "key": respData.key,
            "sort_by": sortByCol,
            "desc": sortByCol === sortBy.col ? !sortBy.desc : true
        }
    }
    const resp = await axios.get(sortByUrl, params)
    setSortBy({
        col: sortByCol,
        desc: sortByCol === sortBy.col ? !sortBy.desc : true
    })
    const sortedRespData = JSON.parse(resp.data.body)
    setRespData(sortedRespData)
}

export function createLinkItem(fieldValue, columnHeader, columnsHaveLinks) {
    let linkPathEnd = columnsHaveLinks[columnHeader]["linkPathUseSelf"]
        ? fieldValue
        : fieldValue[1];

    let fieldValueFIN = Array.isArray(fieldValue)
        ? fieldValue[1]
        : fieldValue
    return <Link to={columnsHaveLinks[columnHeader]["basePath"] + linkPathEnd}>{fieldValueFIN}</Link>
}

export function getHtmlRowFieldByIndex(e, index) {
    var rowNodes = e.currentTarget.parentNode.parentNode.childNodes
    var field = rowNodes[index].lastChild.innerHTML
    return field
}