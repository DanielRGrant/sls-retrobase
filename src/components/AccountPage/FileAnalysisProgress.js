import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchData, deleteFileData, delayFetchData, addTokenToActionFunction } from './functions'
import { useAuth0 } from "@auth0/auth0-react";
import useTableScript from '../TableClientSideProcess/react-table-creator';
import useFilters from '../TableClientSideProcess/react-table-filters';
import { colParams } from './params'


const useFileAnalysisProgress = ({setIsData, setLoading}) => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null)
    const history = useHistory()
    const [rowActions, setRowActions] = useState([])

    useEffect(() => {
        getAccessTokenSilently().then(
            token => setToken(token)
        )
    }, [user]);
    useEffect(() => {
        if (user && token) {
            const deleteFileDataActionFunction = addTokenToActionFunction(token, deleteFileData)
            console.log(deleteFileDataActionFunction)
            setRowActions({
                "Delete Data": {
                    "function": deleteFileDataActionFunction,
                    "columnHeader": "file_id",
                    "onCompleteFunction": () => delayFetchData({ token, history, setData, setIsData, setLoading })
                }
            })
            fetchData({ token, history, setData, setIsData, setLoading })
        }
    }, [user, token]);

    var { filteredData, filters } = useFilters({ data, colParams })
    var { dataTable, pageNumbers, itemsPerPageSelect, actionButtons } = useTableScript({ "tableData": filteredData, colParams, rowActions })
    return (
        <div>
            <>{filters}</>
            <div>
                <>{actionButtons}</>
                <button 
                    onClick={() => fetchData({ token, history, setData, setIsData, setLoading })}
                >
                    Refresh
                </button>
            </div>
            <div className="querytable">
                {dataTable}
            </div>
            <div className="page-numbers-container">{pageNumbers}</div>
            <span>Items per page: {itemsPerPageSelect}</span>
        </div>
    )
}


export default useFileAnalysisProgress