import React, { useState } from 'react';
import LoadingBox from '../LoadingBox';
import { useSubmitSequence, useSubmitFile } from './QueryFormFunctions';
import { useAuth0 } from "@auth0/auth0-react";
import InlineMessage from '../InlineMessage';
import {
    renderFileInputMetaDataField,
    renderFileInputFields,
    renderSequenceInputFields,
    renderMustLoginInlineMessage
} from './renderHooks';


const QueryFormPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [loadingBoxTitle, setLoadingBoxTitle] = useState("");
    const [loadingBoxMessage, setLoadingBoxMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")
    // Form inputs
    const [file, setFile] = useState(null);
    const [metadata, setMetadata] = useState({
        "tissue": "",
        "cancer": "No",
        "published": "No",
        "publication": "",
        "researcher": "",
        "uploadTe": "No"
    })
    // initialise table settings
    const [inputType, setInputType] = useState(props.location.state?.uploadTe ? "file" : "sequence");
    const [uploadTe, setUploadTe] = useState("Yes");
    const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0();

    // event handlers
    const onInputTypeChange = (e) => {
        setInputType(e.target.value)
    }

    const onUploadTeChange = (e) => {
        setUploadTe(e.target.value)
        if (e.target.value === "No") {
            setMetadata(
                {
                    tissue: "",
                    cancer: "No",
                    published: "No",
                    publication: "",
                    researcher: "",
                    uploadTe: "No"
                });
        }
    }

    function FormGetFile(e) {
        setFile(e.target.files[0])
    }
    function FormGetTissue(e) {
        setMetadata({ ...metadata, tissue: e.target.value })
    }
    function FormGetCancer(e) {
        setMetadata({ ...metadata, cancer: String(e.target.value) })
    }
    function FormGetPublished(e) {
        setMetadata({ ...metadata, published: String(e.target.value) })
    }
    function FormGetPublication(e) {
        setMetadata({ ...metadata, publication: e.target.value })
    }
    function FormGetResearcher(e) {
        setMetadata({ ...metadata, researcher: e.target.value })
    }

    const useHandleSubmitSequence = e => useSubmitSequence({ e, 
        metadata, 
        setLoading, 
        setLoadingBoxMessage, 
        setLoadingBoxTitle, 
        setShowMessage, setMessage, 
        history: props.history
    });

    const useHandleSubmitFile = e => useSubmitFile({ 
        e,
        metadata,
        file,
        setLoading,
        setLoadingBoxTitle,
        setLoadingBoxMessage,
        setShowMessage,
        setMessage,
        history: props.history,
        isAuthenticated,
        getAccessTokenSilently,
        user,
        loginWithRedirect
    })

    const fileInputMetaDataField = renderFileInputMetaDataField({
        FormGetTissue,
        FormGetCancer,
        FormGetPublished,
        FormGetResearcher,
        FormGetPublication,
        metadata
    })

    const sequenceInputFields = renderSequenceInputFields()
    const fileInputFields = renderFileInputFields({ FormGetFile, uploadTe, onUploadTeChange, fileInputMetaDataField })
    const mustLoginInlineMessage = renderMustLoginInlineMessage({ loginWithRedirect, inputType, isAuthenticated})

    const queryForm = (
        <section className = "queryForm" >
            <div className="box queryForm">
                <div className="container">
                    <div className="smallertext">
                        <h1>Query sequences against the Retrobase database</h1>
                        <InlineMessage show={showMessage} success={false} message={message} />
                        {mustLoginInlineMessage}
                        <form onSubmit={inputType === "sequence" ? useHandleSubmitSequence : useHandleSubmitFile}>
                            <table class="queryFormTable">
                                <tbody>
                                    <tr>
                                        <th>Input Type: </th>
                                        <td>
                                            <span className="nowrap" style={{ "paddingRight": "4rem" }}>
                                                <label for="sequence">Manually enter sequence: </label><input type="radio" value="sequence" name="inputType" checked={inputType === "sequence"} onChange={onInputTypeChange}></input>
                                            </span>
                                            <span className="nowrap">
                                                <label for="file">MZID File: </label><input type="radio" value="file" name="inputType" checked={inputType === "file"} onChange={onInputTypeChange}></input>
                                            </span>
                                        </td>
                                    </tr>
                                    {inputType === "sequence" ? sequenceInputFields : fileInputFields}
                                    <tr>
                                        <button>Submit</button>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div>
                        <h2>About Query</h2>
                        <p>The Retrobase Query tool performs exact matching of query sequences to sequences in the database. Currently BLAST algorithms are not available.</p>
                        <p>Note: To experiment, you can simply enter the character "A", select either Protein Sequence or Dna Sequence and submit.</p>
                    </div>

                </div>
            </div >
        </section>
    )

    return (
        <>
            {loading
                ? 
                    <LoadingBox 
                        title={loadingBoxTitle} 
                        message={loadingBoxMessage}
                    />
                : queryForm
            }
        </>
    )
};


export default QueryFormPage;