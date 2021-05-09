import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useTableScript from "../react-table-creator/react-table-creator"
import FileAnalysisProgress from './FileAnalysisProgress'
import NoFilesSubmitted from './NoFilesSubmitted'
import { fetchData, actionsOptionsConstructor } from './AccountPageFunctions'
import { colParams } from './AccountPageParams'

const AccountPage = (props) => {
    const { user, getAccessTokenSilently} = useAuth0();
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null)
    const [rowActions, setRowActions] = useState(null)
    console.log(colParams)

    useEffect(() => {
        getAccessTokenSilently().then(
            token=> setToken(token)
        )
        console.log(token)
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
                <div style={{"border": "solid 1px black", "background": "white", "text-align": "center"}}>
                    <h4><b>Current User: </b>{user?.nickname}</h4>
                </div>
                <h3>File Analysis Progress</h3>
                    {data.length 
                        ? 
                            <FileAnalysisProgress
                                actionsMenu={actionsMenu}
                                dataTable={dataTable}
                                pageLinks={pageLinks}
                                itemsPerPage={itemsPerPage}
                                token={token}
                                setData={setData}
                                history={props.history}
                            /> 
                        : <NoFilesSubmitted/>
                    }
            </div>
        </section>
    )
}

export default AccountPage