import InlineMessage from '../InlineMessage';
export const renderPublicationField = ({ publication, FormGetPublication }) => {
    return (
        <tr>
            <th>Provide link to publication: </th>
            <td>
                <input type="text" id="publication" name="publication" value={publication} onChange={FormGetPublication}></input>
            </td>
        </tr>
    )
}


export const renderFileInputMetaDataField = ({ 
    FormGetTissue, 
    FormGetCancer, 
    FormGetPublished, 
    FormGetResearcher, 
    metadata
}) => {
    const publicationField = renderPublicationField({ publication: metadata.publication })

    return (
        <>
            <tr>
                <th>Tissue: </th>
                <td>
                    <input type="text" id="tissueType" name="tissueType" value={metadata.tissue} onChange={FormGetTissue}></input>
                </td>
            </tr>
            <tr>
                <th>
                    Is this a cancer sample?
                </th>
                <td>
                    <select id="cancer" name="cancer" value={metadata.cancer} onChange={FormGetCancer}>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>
                    Is this data published?
                </th>
                <td>
                    <select id="published" name="published" value={metadata.published} onChange={FormGetPublished}>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </td>
            </tr>
            { String(metadata.published) === "Yes" && publicationField }
            <tr>
                <th>Researcher Name: </th>
                <td>
                    <input type="text" id="researcher" name="researcher" value={metadata.researcher} onChange={FormGetResearcher}></input>
                </td>
            </tr>
        </>
    )
}

const renderUploadTeAtlasBool = ({onUploadTeChange, uploadTe}) => {
    return (
        <tr>
            <th>Upload to tissue expression atlas?</th>
            <td>
                <span className="nowrap" style={{ "paddingRight": "4rem" }}>
                    <label for="uploadYes">Yes</label><input type="radio" value="Yes" name="uploadTe" checked={uploadTe === "Yes"} onChange={onUploadTeChange}></input>
                </span>
                <span className="nowrap">
                    <label for="uploadNo">No</label><input type="radio" value="No" name="uploadTe" checked={uploadTe === "No"} onChange={onUploadTeChange}></input>
                </span>
            </td>
        </tr>
    )
}

export const renderFileInputFields = ({ FormGetFile, uploadTe, onUploadTeChange, fileInputMetaDataField }) => {
    const uploadTeAtlasBool = renderUploadTeAtlasBool({ onUploadTeChange, uploadTe })
    return (
        <>
            <tr>
                <th>Upload MZID .zip file:</th>
                <td>
                    <input type="file" id="uploadFile" name="uploadFile" value={undefined} onChange={FormGetFile}></input>
                </td>
            </tr>
            {uploadTeAtlasBool}
            {uploadTe === "Yes" && fileInputMetaDataField}
        </>
    )
}

export const renderSequenceInputFields = () => {
    return (
        <>
            <tr>
                <th>Enter Query</th>
                <td><textarea type="text" id="query" name="query"></textarea></td>
            </tr>
            <tr>
                <th>Protein or DNA</th>
                <td>
                    <select id="sequenceType" name="sequenceType">
                        <option value='dna'>DNA Sequence</option>
                        <option value='protein'>Protein Sequence</option>
                    </select>
                </td>
            </tr>
        </>
    )
}


export const renderMustLoginInlineMessage = ({ loginWithRedirectWithAppState, inputType, isAuthenticated}) => {
    return (
        <InlineMessage
            show={
                inputType === "file" && !isAuthenticated
            }
            success={false} message={
                <span>User must <span className="PageNumberLinks" onClick={loginWithRedirectWithAppState}>log in</span> to submit file</span>
            }
        />
    )
}

export const renderQueryForm = ({
    mustLoginInlineMessage,
    inputType,
    useHandleSubmitSequence,
    useHandleSubmitFile,
    onInputTypeChange,
    sequenceInputFields,
    fileInputFields,
    message,
    showMessage
}) => {
    return (
        <section className="queryForm" >
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
}