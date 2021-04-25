import React, { useState } from 'react';
import axios from 'axios';
//import { delay } from '../functions/functions';
import LoadingBox from '../LoadingBox'
import { ValidateSequence } from './QueryFormFunctions';
import InlineMessage from '../InlineMessage'
import { AxiosGetAndPush, SubmitFile } from '../../functions/functions'
import { useAuth0 } from '@auth0/auth0-react';
const config = require('../../jsconfig.json')

const QueryFormPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [loadingBoxTitle, setLoadingBoxTitle] = useState("");
    const [loadingBoxMessage, setLoadingBoxMessage] = useState("");

    //user messages

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")

    // Form inputs
    const [file, setFile] = useState(null);
    const [tissue, setTissue] = useState(null);
    const [cancer, setCancer] = useState("No");
    const [published, setPublished] = useState("No");
    const [publication, setPublication] = useState("None");
    const [researcher, setResearcher] = useState(null);

    const { isAuthenticated, getAccessTokenSilently, user, loginWithRedirect } = useAuth0();

    const [inputType, setInputType] = useState(props.location.state?.uploadTe ? "file" : "sequence");
    const [uploadTe, setUploadTe] = useState("Yes");
    console.log(props.location.state?.uploadTe)
    const onInputTypeChange = (e) => {
        setInputType(e.target.value)
    }

    const onUploadTeChange = (e) => {
        setUploadTe(e.target.value)
        if (e.target.value === "No") {
            setTissue(null);
            setCancer("No");
            setPublished("No");
            setPublication("None");
            setResearcher(null);
        }
    }

    function FormGetFile(e) {
        setFile(e.target.files[0])
    }
    function FormGetTissue(e) {
        setTissue(e.target.value)
    }
    function FormGetCancer(e) {
        setCancer(e.target.value)
    }
    function FormGetPublished(e) {
        setPublished(e.target.value)
    }
    function FormGetPublication(e) {
        setPublication(e.target.value)
    }
    function FormGetResearcher(e) {
        setResearcher(e.target.value)
    }

    const useSubmitSequence = (e) => {
        e.preventDefault()
        setLoading(true);
        setLoadingBoxTitle("Querying")
        setLoadingBoxMessage("Query in progress. Please do not refresh...")

        const seqType = e.target.sequenceType.value;
        const seq = e.target.query.value;

        
        const {valid, message} = ValidateSequence(seq,seqType)
        if (!valid) {
            setLoading(false)
            setShowMessage(true)
            setMessage(message)
            return
        } 
        
        let requestUrl;
        let pushUrl;
        if (seqType === "Protein Sequence") {
            requestUrl = config.queryApiUrl + "/sls-query-prot-s3";
            pushUrl = '/proteinquery/' + seq;
        } else {
            requestUrl = config.queryApiUrl + "/sls-query-dna-s3";
            pushUrl = '/dnaquery/' + seq;            
        }
        const params = {
            "query": seq
        }
        AxiosGetAndPush(params, requestUrl, pushUrl, props.history).then( res => {
            setLoading(false);
            setShowMessage(true);
            setMessage(res.message);
        })
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault()
        if (!isAuthenticated) {
            loginWithRedirect()
        } else {
            setLoading(true);
            setLoadingBoxTitle("Submitting File")
            setLoadingBoxMessage("Your file is being submitted. Please do not refresh...")

        const metadata = uploadTe === "Yes" 
            ? 
                {
                    "file_name": file?.name,
                    "tissue": tissue,
                    "cancer": String(cancer),
                    "published": String(published),
                    "publication": publication,
                    "researcher": researcher,
                    "user_id": user.sub,
                    "uploadTe": "Yes"
                }
            :
                {
                    "file_name": file?.name,
                    "tissue": "",
                    "cancer": "",
                    "published": "",
                    "publication": "",
                    "researcher": "",
                    "user_id": user.sub,
                    "uploadTe": "No"
                }

            const formData = {
                file: file,
            }

            const accessToken = await getAccessTokenSilently({
                audience: `https://sls-retrobase`,
                scope: "get:data",
            });

            const getPresignedUrlUrl = "https://kvuhomev06.execute-api.us-east-1.amazonaws.com/dev/get-s3-presigned-url"
            const pushUrl = "/filesentsuccess"

            SubmitFile({ metadata, formData, accessToken, getPresignedUrlUrl, history: props.history, pushUrl})
                .then(resp => {
                    if (!resp.success) {
                        setLoading(false)
                        setShowMessage(true)
                        setMessage(resp.message)
                    }
                })
        }
    }

    const sequenceInputFields = (
        <>
            <tr>
                <th>Enter Query</th>
                <td><textarea type="text" id="query" name="query"></textarea></td>
            </tr>
            <tr>
                <th>Protein or DNA</th>
                <td>
                    <select id="sequenceType" name="sequenceType">
                        <option>DNA Sequence</option>
                        <option>Protein Sequence</option>
                    </select>
                </td>
            </tr>
        </>
    );
    
    const uploadTeAtlasBool = (
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

    // Publication field available if published field is set to yes
    const publicationInput = (String(published) === "Yes")
        ? (<tr>
            <th>Provide link to publication: </th>
            <td>
                <input type="text" id="publication" name="publication" value={publication} onChange={FormGetPublication}></input>
            </td>
        </tr>)
        : null

    const fileInputMetaDataField = (
        <>
            <tr>
                <th>Tissue: </th>
                <td>
                    <input type="text" id="tissueType" name="tissueType" value={tissue} onChange={FormGetTissue}></input>
                </td>
            </tr>
            <tr>
                <th>
                        Is this a cancer sample?
                </th>
                <td>
                    <select id="cancer" name="cancer" value = {cancer} onChange={FormGetCancer}>
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
                    <select id="published" name="published" value={published} onChange={FormGetPublished}>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </td>
            </tr>
            { publicationInput }
            <tr>
                <th>Researcher Name: </th>
                <td>
                    <input type="text" id="researcher" name="researcher" value={researcher} onChange={FormGetResearcher}></input>
                </td>
            </tr>
        </>
    )

    const fileInputFields = (
        <>
            <tr>
                <th>Upload MZID .zip file:</th>
                <td>
                    <input type="file" id="uploadFile" name="uploadFile" value={null} onChange={FormGetFile}></input>
                </td>
            </tr>
            { uploadTeAtlasBool}
            {uploadTe === "Yes" ? fileInputMetaDataField : null}
        </>
    )


    const inputFields = inputType === "sequence"
        ? sequenceInputFields
        : fileInputFields

    const queryForm = (
        <section className = "queryForm" >
            <div className="box queryForm">
                <div className="container">
                    <div className="smallertext">
                        <h1>Query sequences against the Retrobase database</h1>

                        <InlineMessage show={showMessage} success={false} message={message} />
                        <InlineMessage show={
                            inputType === "file" && !isAuthenticated
                        } success={false} message={
                            <span>User must <span className="PageNumberLinks" onClick={loginWithRedirect}>log in</span> to submit file</span>
                        }/>
                        <form onSubmit={inputType === "sequence" ? useSubmitSequence : handleSubmitFile}>
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
                                    {inputFields}
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
                ? <LoadingBox title={loadingBoxTitle} message={loadingBoxMessage}/>
                : queryForm
            }
        </>
    )
};

export default QueryFormPage;