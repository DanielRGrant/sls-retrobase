import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export function createLinkItem(fieldValue, columnHeader, columnsHaveLinks) {
    let linkPathEnd = columnsHaveLinks[columnHeader]["linkPathUseSelf"]
        ? fieldValue
        : fieldValue[1];

    let fieldValueFIN = Array.isArray(fieldValue)
        ? fieldValue[1]
        : fieldValue
    return <Link to={columnsHaveLinks[columnHeader]["basePath"] + linkPathEnd}>{fieldValueFIN}</Link>
}

const getHtmlRowFieldByIndex = (e, index) => {
    console.log(e.currentTarget)
    var rowNodes = e.currentTarget.parentNode.parentNode.childNodes
    var field = rowNodes[index].lastChild.innerHTML
    return field
}

const useTableScript = ({ tableData, colParams, numPageNumbers = 11, rowActions = null, sortByFun }) => {
    const [actionString, setActionString] = useState(null)
    const { columnsHaveLinks, customColumns, columnHeaders, columnHeadersFinal } = colParams
    if (!columnHeaders) {
        throw { name: "MissingArgumentException", message: "columnHeaders key missing from params" }
    }
    if (!typeof (columnHeaders) === "array") {
        throw {
            name: "InvalidTypeException", message: "columnHeaders value must be array of strings"
        }
    }

    const onSelectRow = (e, setActionString) => {
        var index = rowActions.colIndex;
        var actionStringTmp = getHtmlRowFieldByIndex(e, index)
        setActionString(actionStringTmp)
    }

    const handleSortBy = e => sortByFun(e)

    var rowList = [] // collect table rows
    // iteratively create table rows
    if (!tableData.length) return [null, null, null, null, null] // null * number of react object outputs of hook

    for (var k = 0; k < tableData.length; k++) {
        var entry = tableData[k];

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
        if (rowActions) rowScript.unshift(
            // add radio button to select row for row action
            <td><input type="radio" name="row" onChange={onSelectRow}></input></td>
        )
        // Add row or filter out
        rowList.push(<tr>{rowScript}</tr>)
    }

    const headers = columnHeadersFinal ? columnHeadersFinal : columnHeaders // use key values if not columnHeadersFinal input
    const headersScript = headers.map(header => {
        return <th scope="column" onClick={handleSortBy}>{header}</th>
    })
    if (rowActions) headersScript.unshift(<th></th>) //include empty column header for row select

    const dataTable = (
        <table>
            <thead>
                <tr>
                    {headersScript}
                </tr>
            </thead>
            <tbody>
                {rowList}
            </tbody>
        </table>
    )

    var actionsMenu
    if (rowActions) {
        actionsMenu = <button onClick={() => rowActions.deleteFileData(actionString)}>Delete Data</button>
    }
    return {dataTable, actionsMenu}
}



export default useTableScript
