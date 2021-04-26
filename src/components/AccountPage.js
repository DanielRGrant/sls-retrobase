import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchPageData } from "../functions/functions"
import { customClasses, linkIfOtherColEq } from "../components/react-table-creator/CustomColumnFunctions"
import useTableScript from "../components/react-table-creator/react-table-creator"
const config = require('../jsconfig.json')

const fetchData = async function (token, history, setData) {
    const accountRequestInput = {
        headersParams: {
            "params": {},
            "headers": {
                Authorization: `Bearer ${token}`,
            }
        },
        requestUrl: `${config}/teuploadcheckprogress/`,
        errorUrl: "/error",
        history: history
    }
    const data = await fetchPageData(accountRequestInput)
    console.log(data.body)
    setData(data.body)
}

const  actionsOptionsConstructor = async (token, setRowActions) => {
    // create function that takes string to submit as file_id
    const deleteFileData = async (actionString) => {
        const url = `${config.queryApiUrl}/teremovemziddata/`
        const data = { "file_id": actionString }
        const headers = { "headers": { "Authorization": `Bearer ${token}` } }
        console.log(url, data, headers)
        var resp = await axios.post(url, data, headers)
        console.log(resp)
    }
    const actionsOptions = {
        "colIndex": 2, // index of file_id
        "deleteFileData": (actionString) => deleteFileData(actionString)
    }
    setRowActions(actionsOptions)
}

const AccountPage = (props) => {
    const { user, getAccessTokenSilently} = useAuth0();
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null)
    const [rowActions, setRowActions] = useState(null)

    const colParams = {
        columnHeaders: [
            "file_name",
            "file_id",
            "progress",
            "num_peptides"
        ],
        columnsHaveLinks: {},
        columnsToFilter: [],
        columnHeadersFinal: [
            "File Name",
            "File ID",
            "Status",
            "Peptides Matched"
        ],
        customColumns: {
            "file_id": (args) => {
                const linkTo = "/fileresults/";
                const refCol = "progress";
                return linkIfOtherColEq(args, linkTo, refCol)
            },
            "progress": (args) => {
                const params = {
                    "complete": "green",
                    "active": "purple",
                    "failed": "red"
                }
                return customClasses(args, params)
            }
        }
    }

    useEffect(() => {
        getAccessTokenSilently().then(
            token=> setToken(token)
        )

        if (user && token){
            actionsOptionsConstructor(token, setRowActions).then(
                () => fetchData(token, props.history, setData)
            )
        }
    }, [user, token]);

    
    var [dataTable, filterDropdownsRaw, pageLinks, itemsPerPage, actionsMenu] = useTableScript({"tableData": data, colParams, rowActions})

    return (
        <section>
            <div className="box">
                <h1>My Account</h1>
                <h3>File Analysis Progress</h3>
                <div><>{actionsMenu && actionsMenu}</><button onClick={() => fetchData(token, props.history, setData)}>Refresh</button></div>
                <div className="querytable">
                    {dataTable && dataTable}                    
                </div>
                <div className="page-numbers-container">{pageLinks && pageLinks}</div>
                <span>Items per page: {itemsPerPage && itemsPerPage}</span>
            </div>
        </section>
    )
}

export default AccountPage