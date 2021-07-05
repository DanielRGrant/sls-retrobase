import React, { useState } from 'react';
import useAnalysisProgress from './FileAnalysisProgress'
import useNoFilesSubmitted from './NoFilesSubmitted'
import { useAuth0 } from "@auth0/auth0-react";


const AccountPage = (props) => {
    const [ isData, setIsData ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const { user } = useAuth0();
    const AnalysisProgress = useAnalysisProgress({setIsData, setLoading})
    const NoFilesSubmitted = useNoFilesSubmitted()
 
    return (
        <section className="accountPage">
            <div className="box">
                <h1>My Account</h1>
                <div style={{"border": "solid 1px black", "background": "white", "text-align": "center"}}>
                    <h4><b>Current User: </b>{user?.nickname}</h4>
                </div>
                <h3>File Analysis Progress</h3>
                    {!loading && <>
                        {isData
                            ? AnalysisProgress
                            : NoFilesSubmitted
                        }
                    </>}
            </div>
        </section>
    )
}

export default AccountPage