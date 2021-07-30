import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchData, deleteFileData, delayFetchData, addToken } from './functions'
import { useAuth0 } from "@auth0/auth0-react";
import useTableScript from '../TableClientSideProcess/react-table-creator';
import { colParams } from './params'
import PopUpOptions from '../PopUpOptions/PopUpOptions'


const useFileAnalysisProgress = ({ setIsData, setLoading }) => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null)
    const history = useHistory()
    const [rowActions, setRowActions] = useState([])
    const [popUpActive, setPopUpActive] = useState(false)
    const [deleteDataProps, setDeleteDataProps] = useState({})

    const activateDeleteDataPopUp = (actionString) => {
        setPopUpActive(true)
        setDeleteDataProps({ actionString, token})
    }

    useEffect(() => {
        getAccessTokenSilently().then(
            token => setToken(token)
        )   
    }, [user]);

    useEffect(() => {
        if (user && token) {
            setRowActions({
                "Delete Data": {
                    "function": activateDeleteDataPopUp,
                    "columnHeader": "file_id"
                  //  "onCompleteFunction": () => delayFetchData({ token, history, setData, setIsData, setLoading })
                }
            })
            fetchData({ token, history, setData, setIsData, setLoading })
        }
    }, [user, token]);

    var { dataTable, pageNumbers, itemsPerPageSelect, actionButtons } = useTableScript({ "tableData": data, colParams, rowActions })
    return (
        <div>
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
            {
                popUpActive &&
                    <PopUpOptions 
                        setActive={setPopUpActive}
                        options={[
                            {
                                "text": "Yes",
                                "function": () => deleteFileData(deleteDataProps.actionString, token, "true", setPopUpActive)
                            },
                            {
                                "text": "No",
                                "function": () => deleteFileData(deleteDataProps.actionString, token, "false", setPopUpActive)
                            }
                        ]}
                    />
            }
        </div>
    )
}


export default useFileAnalysisProgress