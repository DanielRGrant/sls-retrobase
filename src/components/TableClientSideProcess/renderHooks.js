import { createLinkItem, startEndPaginateLinks } from './functions'
import downArrowBlack from '../../assets/downArrowBlack.png'
import upArrowBlack from '../../assets/upArrowBlack.png'


export const renderTableRows = ({
    tableData,
    isRowActions,
    handleSelectRow,
    colParams: {
        columnHeaders, 
        columnsHaveLinks, 
        customColumns
    }
}) => {
    var rowList = [] // collect table rows

    for (var k = 0; k < tableData.length; k++) {
        var entry = tableData[k];

        // iterate over column headers
        var rowScript = [];
        var fieldValue = null
        var fieldScript = null;

        for (var j = 0; j < columnHeaders.length; j++) {
            var columnHeader = columnHeaders[j]
            fieldValue = entry[columnHeader]
            const hasLink = Object.keys(columnsHaveLinks).includes(columnHeader)

            if (Object.keys(customColumns).includes(columnHeader)) {
                var args = {
                    fieldValue,
                    columnHeader,
                    entry
                }
                fieldScript = customColumns[columnHeader](args)

            } else if (hasLink) {

                fieldScript = (
                    <td>
                        {createLinkItem(entry[columnHeader], columnHeader, columnsHaveLinks)}
                    </td>
                )
                fieldValue = columnsHaveLinks[columnHeader]["linkPathUseSelf"]
                    ? entry[columnHeader]
                    : entry[columnHeader][1];
            } else {
                fieldValue = entry[columnHeader]
                fieldScript = <td>{fieldValue}</td>
            }

            //Add field to row
            if (fieldScript) {
                rowScript.push(fieldScript)
            }
        }
        //if row actions, include radio button
        if (isRowActions) rowScript.unshift(
            <td><input type="radio" name="row" onChange={e => handleSelectRow(e)}></input></td>
        )
        rowList.push(<tr>{rowScript}</tr>)
    }
    return rowList
}

export const renderHeaders = ({isRowActions, sortBy, handleSortBy, "colParams": {columnHeadersFinal, columnHeaders}}) => {
    const arrow = sortBy.desc ? downArrowBlack : upArrowBlack
    const headers = columnHeadersFinal ? columnHeadersFinal : columnHeaders // use key values if columnHeadersFinal input
    const headersScript = headers.map((header, i) => {
        return (
            <th scope="column" onClick={e => handleSortBy(e)} className="nowrap cursorpointer">
                {header}
                {columnHeaders[i] === sortBy.col && <img src={arrow} alt=""/>}
            </th>
        )
    })
    if (isRowActions) headersScript.unshift(<th></th>) //include empty column header for row select
    return headersScript
}

export const renderDataTable = ({ headers, paginatedRows, currentPage }) => {
    return (
        <table>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {paginatedRows[currentPage]}
            </tbody>
        </table>
    )
}

export const renderPageNumbers = ({numPageNumbers, numPages, currentPage, handleClickNewPage}) => {
    const [start, end] = startEndPaginateLinks(numPageNumbers, numPages, currentPage)
    var pageLinks = []
    for (var a = start; a < end; a++) {
        pageLinks.push(
            <li
                className={`PageNumberLinks ${a === currentPage ? "active" : ""} pagination-link`}
                id={a}
                onClick={e => handleClickNewPage(e)}
            >
                {a + 1}
            </li>
        )
    }

    if (currentPage !== 0) {
        pageLinks.unshift(<li className="PageNumberLinks pagination-link" id={"prev"} onClick={handleClickNewPage}>Prev</li>)
    }
    if (currentPage !== end - 1) {
        pageLinks.push(<li className="PageNumberLinks pagination-link" id={"next"} onClick={handleClickNewPage}>Next</li>)
    }
    return pageLinks
};

export const renderItemsPerPageSelect = ({handleItemsPerPageChange}) => {
        return(
            <select onChange={handleItemsPerPageChange}>
                <option>10</option>
                <option>50</option>
                <option>100</option>
                <option>All</option>
            </select>
        )
}

export const renderActionButtons = ({rowActions, handleRowAction}) => {
    return Object.entries(rowActions).map(rowAction => {
        var actionName = rowAction[0]
        return <button id={actionName} onClick={handleRowAction}>{actionName}</button>
    })
}
