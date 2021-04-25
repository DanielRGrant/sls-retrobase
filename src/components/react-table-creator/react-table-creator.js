import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './drop-down'


export function collectUniqueValsFun(columnsToFilter, collectUniqueVals, columnHeader, fieldValue) {
    //Collect values for filter options
    if (columnsToFilter.includes(columnHeader)) {
        if (!(collectUniqueVals[columnHeader].includes(fieldValue))) {
            collectUniqueVals[columnHeader].push(fieldValue)
        }
    }
};

export function FilterOut(excludeRow, value, filterVal, columnHeader, columnsToFilter) {
    //If filter has been applied, rows without filtering value excluded
    if (excludeRow) {
        return true
    }
    if (columnsToFilter.includes(columnHeader)
        && !(filterVal === value)
        && !(filterVal === "No Filter")
    ) { return true }
    return false
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
        start = (currentPage - ceiling);
        end = (currentPage + floor);
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

const getHtmlRowFieldByIndex = (e, index) => {
    console.log(e.currentTarget)
    var rowNodes = e.currentTarget.parentNode.parentNode.childNodes
    console.log(rowNodes[index])
    var field = rowNodes[index].lastChild.innerHTML
    return field
}


const useTableScript = ({tableData, colParams, itemsPerPageIn = 10, numPageNumbers = 11, rowActions=null}) => {
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageIn);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortBy, setSortBy] = useState({"col": null, "desc": true})
    const [actionString, setActionString] = useState(null)

    const { columnsHaveLinks, columnsToFilter, customColumns, columnHeaders, columnHeadersFinal } = colParams

    if (!columnHeaders) {
        throw { name: "MissingArgumentException", message: "columnHeaders key missing from params" }
    }
    if (!typeof (columnHeaders) === "array") {
        throw {
            name: "InvalidTypeException", message: "columnHeaders value must be array of strings"
        }
    }


    const sortedTableData = sortBy.col
        ? sortArrayOfObjs(tableData, sortBy.col, sortBy.desc)
        : tableData

    const handleSortBy = (e) => {
        const i = colParams.columnHeadersFinal.indexOf(e.target.innerHTML)
        const sortByCol = colParams.columnHeaders[i]
        setSortBy(
            {
                "col": sortByCol,
                "desc": sortByCol === sortBy.col ? !sortBy.desc : true
            })
    }

    const onSelectRow = (e) => {
        var index = rowActions.colIndex;
        var actionStringTmp = getHtmlRowFieldByIndex(e, index)
        console.log(actionStringTmp)
        setActionString( actionStringTmp )
    }


    // Prepare to collect filter options
    var collectUniqueVals = {}
    var objForFilterState = {}
    for (var i = 0; i < columnsToFilter.length; i++) {
        collectUniqueVals[columnsToFilter[i]] = ["No Filter"];
        objForFilterState[columnsToFilter[i]] = "No Filter";
    }
    const [filters, setFilters] = useState(objForFilterState)

    var rowList = [] // collect table rows
    // iteratively create table rows



    for (var k = 0; k < sortedTableData.length; k++) {
        var excludeRow = false;
        var entry = sortedTableData[k];

        // iterate over column headers
        var rowScript = [];
        var fieldValue = null
        var fieldScript = null;

        for (var j = 0; j < columnHeaders.length; j++) {
            var columnHeader = columnHeaders[j]
            var fieldValue = entry[columnHeader]

            const hasLink = Object.keys(columnsHaveLinks).includes(columnHeader)

            if (Object.keys(customColumns).includes(columnHeader)) {
                var args = {
                    fieldValue, 
                    columnHeader, 
                    excludeRow, 
                    columnsToFilter, 
                    filters, 
                    collectUniqueVals,
                    entry
                }
                var [fieldScript, excludeRow, collectUniqueVals] = customColumns[columnHeader](args)

            } else if (hasLink) {

                fieldScript = (
                    <td>
                        {createLinkItem(entry[columnHeader], columnHeader, columnsHaveLinks)}
                    </td>
                )
                fieldValue = columnsHaveLinks[columnHeader]["linkPathUseSelf"]
                    ? entry[columnHeader]
                    : entry[columnHeader][1];

                collectUniqueValsFun(columnsToFilter, collectUniqueVals, columnHeader, fieldValue)

                excludeRow = FilterOut(excludeRow, fieldValue, filters[columnHeader], columnHeader, columnsToFilter)

            } else {
                fieldValue = entry[columnHeader]
                excludeRow = FilterOut(excludeRow, fieldValue, filters[columnHeader], columnHeader, columnsToFilter)
                collectUniqueValsFun(columnsToFilter, collectUniqueVals, columnHeader, fieldValue)
                fieldScript = <td>{fieldValue}</td>
            }

            //Add field to row
            if (fieldScript) {
                rowScript.push(fieldScript)
            }
        }
        if (rowActions) rowScript.unshift(
            <td><input type="radio" name="row" onChange={onSelectRow}></input></td>
        )
        // Add row or filter out
        if (!excludeRow) rowList.push(<tr>{rowScript}</tr>)
    }

    // Pagination //

    let paginatedRowList = paginateList(rowList, itemsPerPage);
    const [start, end] = startEndPaginateLinks(numPageNumbers, paginatedRowList.length, currentPage)

    const linkNewPage = (e) => {
        if (e.target.id === "prev") {
            setCurrentPage(currentPage - 1)
        } else if (e.target.id === "next") {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(Number(e.target.id))
        }
    }

    var pageLinks = []
    for (var a = start; a < end; a++) {
        pageLinks.push(
            <li
                className={`PageNumberLinks ${a === currentPage ? "active" : ""} pagination-link`}
                id={a}
                onClick={linkNewPage}
            >
                {a + 1}
            </li>
        )
    }

    if (currentPage !== 0) {
        pageLinks.unshift(<li className="PageNumberLinks pagination-link" id={"prev"} onClick={linkNewPage}>Prev</li>)
    }
    if (currentPage !== end - 1) {
        pageLinks.push(<li className="PageNumberLinks pagination-link" id={"next"} onClick={linkNewPage}>Next</li>)
    }


    // Filters

    // Use state to set filter values when user selects them
    const handleFilter = (e) => {
        const filtersNew = { ...filters }
        filtersNew[e.target.id] = e.target.value
        setFilters(filtersNew)
        setCurrentPage(0)
    }

    // Create filter option dropdowns
    const UniqueVals = Object.entries(collectUniqueVals)
    var filterDropdowns = UniqueVals.map(filterVariables => {
        var columnHeader = filterVariables[0]
        filterVariables = filterVariables[1];
        const filterOptions = filterVariables.map(option => {
            return (
                <option id={option} key={option}>
                    {option}
                </option>
            )
        });

        return <select key={columnHeader} id={columnHeader} onChange={handleFilter}>{filterOptions}</select>
    });
    const headers = columnHeadersFinal ? columnHeadersFinal : columnHeaders // use key values if columnHeadersFinal input
    const headersScript = headers.map(header => {
        return <th scope="column" onClick={handleSortBy}>{header}</th>
    })
    if (rowActions) headersScript.unshift(<th></th>) //include empty column header for row select

    const handleItemsPerPageChange = (e) => {
        if (e.target.value === "All") {
            setItemsPerPage(tableData.length)
        } else {
            setItemsPerPage(Number(e.target.value))
        }
    }

    const itemsPerPageEl = (
        <select onChange={handleItemsPerPageChange}>
            <option>10</option>
            <option>50</option>
            <option>100</option>
            <option>All</option>
        </select>
    )

    const finalTable = (
        <table>
            <thead>
                <tr>
                    {headersScript}
                </tr>
            </thead>
            <tbody>
                {paginatedRowList[currentPage]}
            </tbody>
        </table>
    )
    
    var actionsMenu
    if (rowActions){
        actionsMenu = <button onClick={() => rowActions.deleteFileData(actionString)}>Delete Data</button>
    }

    return [finalTable, filterDropdowns, pageLinks, itemsPerPageEl, actionsMenu]
}

export default useTableScript
