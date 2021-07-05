import React, { useState } from 'react';
import { 
    paginateList, 
    sortArrayOfObjs, 
    sortByFun,
    clickNewPageFun,
    itemsPerPageChangeFun,
    rowActionFun,
    selectRowFun
} from './functions'
import {
    renderTableRows,
    renderItemsPerPageSelect,
    renderHeaders,
    renderDataTable,
    renderPageNumbers,
    renderActionButtons
} from './renderHooks'


const useTableScript = ({tableData, colParams, itemsPerPageIn = 10, numPageNumbers = 11, rowActions=null}) => {
    const [numItemsPerPage, setNumItemsPerPage] = useState(itemsPerPageIn);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortBy, setSortBy] = useState({"col": null, "desc": true})
    const [rowArray, setRowArray] = useState(null)
    const { columnsHaveLinks, customColumns, columnHeaders, columnHeadersFinal } = colParams

    //handle no data submitted
    if (!tableData.length) return []

    const isRowActions = rowActions ? true : false

    const handleSelectRow = e => selectRowFun(e, rowArray, setRowArray)

    const handleRowAction = e => rowActionFun(e, columnHeaders, rowActions, rowArray)

    const handleItemsPerPageChange = e => itemsPerPageChangeFun(e, tableData, setNumItemsPerPage, setCurrentPage)

    const handleClickNewPage = e => clickNewPageFun(e, currentPage, setCurrentPage)

    const handleSortBy = e => sortByFun(e, colParams, sortBy, setSortBy)

    const sortedTableData = sortBy.col
        ? sortArrayOfObjs(tableData, sortBy.col, sortBy.desc)
        : tableData

    const tableRows = renderTableRows({
        "tableData": sortedTableData,
        isRowActions,
        handleSelectRow,
        "colParams": colParams
    });

    let paginatedRows = paginateList(tableRows, numItemsPerPage);

    const headers = renderHeaders({ isRowActions, sortBy, handleSortBy, "colParams": colParams })

    const dataTable = renderDataTable({ headers, paginatedRows, currentPage })

    const pageNumbers = renderPageNumbers({
        numPageNumbers,
        numPages: paginatedRows.length,
        currentPage,
        handleClickNewPage
    })

    const itemsPerPageSelect = renderItemsPerPageSelect({handleItemsPerPageChange})

    const actionButtons = isRowActions 
        ? renderActionButtons({rowActions, handleRowAction})
        : undefined
    return { dataTable, pageNumbers, itemsPerPageSelect, actionButtons }
}

export default useTableScript
