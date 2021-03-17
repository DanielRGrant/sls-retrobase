import React, { useState } from 'react';
import axios from 'axios';
//import { delay } from '../functions/functions';
import FadeLoader from 'react-spinners/FadeLoader';
import { ValidateSequence } from './QueryFormFunctions';
import InlineMessage from '../InlineMessage'
import { AxiosGetAndPush } from '../../functions/functions'
const config = require('../../jsconfig.json')

const QueryFormPage = (props) => {
    const [querying, setQuerying] = useState(false);

    //form inputs
    const [file, setFile] = useState(null);
    const [inputType, setInputType] = useState("sequence");
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState("")

    //form inputs
    function FormGetFile(e) {
        setFile(e.target.files[0])
    }

    const onInputTypeChange = (e) => {
        setInputType(e.target.value)
    }

    const useSubmitSequence = (e) => {
        e.preventDefault()
        setQuerying(true);

        const seqType = e.target.sequenceType.value;
        const seq = e.target.query.value;

        
        const {valid, message} = ValidateSequence(seq,seqType)
        if (!valid) {
            setQuerying(false)
            setShowMessage(true)
            setMessage(message)
            return
        } 
        
        let requestUrl;
        let pushUrl;
        if (seqType === "Protein Sequence") {
            requestUrl = config.apiUrl;
            console.log(requestUrl)            
            pushUrl = '/proteinquery/' + seq;
        } else {
            requestUrl = 'https://9fqebvawee.execute-api.us-east-1.amazonaws.com/dev/dnasearchresults/';
            pushUrl = '/dnaquery/' + seq;            
        }
        const params = {
            "query": seq
        }
        AxiosGetAndPush(params, requestUrl, pushUrl, props.history).then( res => {
            setQuerying(false);
            setShowMessage(true);
            setMessage(res.message);
        })
    };

    /*const submitFile = async (e) => {
        setError(false);
        //Make filename key
        const metadata = {
            "username": props.user.username
        }

        const SubmitFormParams = {
            "headers": {
                "Authorization": props.user.signInUserSession.idToken.jwtToken
            },
            "params": metadata
        }

        try {
            setLoading(true)
            const response = await axios.get("https://kvuhomev06.execute-api.us-east-1.amazonaws.com/dev/get-s3-presigned-url", SubmitFormParams)
            console.log("Collected presigned url")
            const signedURL = response.data.url
        
            //rename file to key for presigned upload
            Object.defineProperty(file, 'name', {
                writable: true,
                value: response.data.key
            });
            console.log(signedURL, "sending file")
            const axiosResponse = await axios.put(signedURL, file);
            console.info(axiosResponse)

            setLoading(false)
            setSuccess(true)

        } catch (error) {
            setLoading(false)

            setError(true);
            setErrorMessage("Authorization to upload data not granted")
        }
    }
    */


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
    
    const fileInputFields = (
        <tr>
            <td>Upload MZID file:</td>
            <td>
                <input type="file" id="uploadFile" name="uploadFile" value={null} onChange={FormGetFile}></input>
            </td>
        </tr>
    )


    const inputFields = inputType === "sequence"
        ? sequenceInputFields
        : fileInputFields
            

    const queryLoading = (
        <section className="queryLoading">
            <div className="box">
                <h3> Querying</h3>
                <p>Your query is in progress. Please do not refresh...</p>
            </div>                
                <FadeLoader />
        </section>
    )

    const queryForm = (
        <section className = "queryForm" >
            <div className="box queryForm">
                <div className="container">
                    <div className="smallertext">
                        <h1>Query sequences against the Retrobase database</h1>
                        <InlineMessage show={showMessage} success={false} message={message}/>
                        <form onSubmit={inputType === "sequence" ? useSubmitSequence : null}>
                            <table class="queryFormTable">
                                <tbody>
                                    <tr>
                                        <th>Input Type: </th>
                                        <td>
                                            <span className="nowrap" style={{ "paddingRight": "4rem" }}>
                                                <label for="sequence">Manually enter sequence: </label><input type="radio" value="sequence" name="inputType" checked={inputType === "sequence"} onChange={onInputTypeChange}></input>
                                            </span>
                                            <span className="nowrap">
                                                <label for="file">MZID File: </label><input type="radio" value="file" name="inputType" checked={inputType === "file"} disabled onChange={onInputTypeChange}></input>
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
            {querying
                ? queryLoading
                : queryForm
            }
        </>
    )
};

export default QueryFormPage;