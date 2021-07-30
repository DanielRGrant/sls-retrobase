import { Link } from 'react-router-dom';


export function collectUniqueValsFun({columnsToFilter, collectUniqueVals, columnHeader, value}) {
    //Collect values for filter options
    if (columnsToFilter.includes(columnHeader)) {
        if (!collectUniqueVals[columnHeader].includes(value)) {
            collectUniqueVals[columnHeader].push(value)
        }
    }
};

export function FilterOut({excludeRow, value, appliedFilter, columnHeader, columnsToFilter}) {
    //If filter has been applied, rows without filtering value excluded
    if (excludeRow) return true
    if (columnsToFilter.includes(columnHeader)
        && !(appliedFilter === value)
        && !(appliedFilter === "No Filter")
    )  return true
    return false
}

export const createFilterStateObj = (columnsToFilter) => {
    // Prepare to collect filter options
    var collectUniqueVals = {}
    var objForFilterState = {}
    for (var i = 0; i < columnsToFilter.length; i++) {
        collectUniqueVals[columnsToFilter[i]] = ["No Filter"];
        objForFilterState[columnsToFilter[i]] = "No Filter";
    }
    return ({ collectUniqueVals, objForFilterState})
}

export function createLinkItem(fieldValue, columnHeader, columnsHaveLinks) {
    let linkPathEnd = columnsHaveLinks[columnHeader]["linkPathUseSelf"]
        ? fieldValue
        : fieldValue[1];

    let fieldValueFIN = Array.isArray(fieldValue)
        ? fieldValue[1]
        : fieldValue
    
    return <Link to={`/${columnsHaveLinks[columnHeader]["basePath"]}/${linkPathEnd}`}>{fieldValueFIN}</Link>
}

export function paginateList(arr, size) {
    return arr.reduce((acc, val, i) => {
        let idx = Math.floor(i / size)
        let page = acc[idx] || (acc[idx] = [])
        page.push(val)
        return acc
    }, [])
}

export function startEndPaginateLinks(pagesCutOff, numPages, currentPage) {
    //Calculates cutoffs for page number links
    var start,
        end,
        ceiling = Math.ceil(pagesCutOff / 2),
        floor = Math.floor(pagesCutOff / 2);

    if (numPages < pagesCutOff) {
        start = 0;
        end = numPages;
    } else if (currentPage >= 0 && currentPage <= ceiling) {
        start = 0;
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

export const sortArrayOfObjs = (arr, key, desc) => {
    const sorted = arr.sort((a, b) => {
        var a2 = a[key].toString()
        var b2 = b[key].toString()
        if (desc) {
            return b2.localeCompare(a2)
        } else {
            return a2.localeCompare(b2)
        }
    });
    return sorted
}

export const getHtmlRowFieldByIndex = (e, index) => {
    var rowNodes = e.currentTarget.parentNode.parentNode.childNodes
    var field = rowNodes[index].lastChild.innerHTML
    return field
}

export const tableRowToArray = (e) => {
    const rowNodes = e.currentTarget.parentNode.parentNode.childNodes
    const arr = [...rowNodes].map(node => {
        if (node.lastChild.innerHTML) return node.lastChild.innerHTML
        if (node.innerHTML) return node.innerHTML
        else return 
    })
    //var field = rowNodes[index].lastChild.innerHTML
    return arr
}

//event handler functions

export const sortByFun = (e, colParams, sortBy, setSortBy) => {
    const i = colParams.columnHeadersFinal.indexOf(e.currentTarget.textContent)
    const sortByCol = colParams.columnHeaders[i]
    setSortBy(
        {
            "col": sortByCol,
            "desc": sortByCol === sortBy.col ? !sortBy.desc : true
        }
    )
}

export const clickNewPageFun = (e, currentPage, setCurrentPage) => {
    if (e.target.id === "prev") {
        setCurrentPage(currentPage - 1)
    } else if (e.target.id === "next") {
        setCurrentPage(currentPage + 1)
    } else {
        setCurrentPage(Number(e.target.id))
    }
}

export const itemsPerPageChangeFun = (e, tableData, setNumItemsPerPage, setCurrentPage) => {
    if (e.target.value === "All") {
        setNumItemsPerPage(tableData.length)
    } else {
        setNumItemsPerPage(Number(e.target.value))
    }
    setCurrentPage(0)
}

export const rowActionFun = (e, columnHeaders, rowActions, rowArray) => {
    const index = columnHeaders.indexOf(rowActions[e.target.id].columnHeader) + 1 // +1 offsets radio button col
    rowActions[e.target.id].function(rowArray[index])
    if (rowActions[e.target.id].onCompleteFunction) {
        rowActions[e.target.id].onCompleteFunction(rowArray[index])
    }
}

export const selectRowFun = (e, rowArray, setRowArray) => {
    var rowArray = tableRowToArray(e)
    setRowArray(rowArray)
}