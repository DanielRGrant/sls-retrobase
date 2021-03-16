//import React, {useState} from 'react';
import axios from 'axios';
import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import FadeLoader from 'react-spinners/FadeLoader';
import { Link } from 'react-router-dom';

const UploadTeData = (props) => {  
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

// Form inputs
    const [file, setFile] = useState(null);
    const [tissue, setTissue] = useState(null);
    const [cancer, setCancer] = useState("No");
    const [published, setPublished] = useState("No");
    const [publication, setPublication] = useState(null);
    const [researcher, setResearcher] = useState(null);


    function FormGetFile (e) {
        setFile(e.target.files[0])
    }
    function FormGetTissue (e) {
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

// Form error handling
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const SubmitForm = async (e) => {
        e.preventDefault()
        return
        setError(false);
        //Make filename key
        const metadata = {
            "tissue": tissue,
            "cancer": ( String(cancer) === "Yes"? true : false ),
            "published": ( String(published) === "Yes" ? true : false ),
            "publication": publication,
            "researcher": researcher,
            "username": props.user.username
        }
        if (!tissue || !researcher || (published==="Yes" && !publication)) {
            setError(true);
            console.log(published)
            setErrorMessage("You have missed some form fields")
            return
        }
        
        const SubmitFormParams = { 
            "headers": {
                "Authorization": props.user.signInUserSession.idToken.jwtToken
            },
            "params": metadata }
        
        
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


    const errorMessageBox = error
        ? (<div style={{ "color": "red", "border": "red solid 2px", "padding": "1rem" }}>
            {errorMessage}
        </div>)
        : null

// if success sending file, return success page
    if (success) {
        return(
            <div>
                <h3>Success!</h3>
                <p>File has been send for processing. When ready, your results will be available at <Link>My Account</Link></p>
            </div>
        )
    }

// Publication field available if published field is set to yes
    const publicationInput = (String(published) === "Yes")
    ? (<tr>
            <td>Provide link to publication: </td>
            <td>
                <input type="text" id="publication" name="publication" value={publication} onChange={FormGetPublication}></input>
            </td>
        </tr>)
    : null

    return (
        <section>
            <div className="box">
                <div className="container">
                    <div className="smallertext">
                        <div style={{ "color": "green", "border": "green solid 2px", "padding": "1rem", "margin": "10px 0" }}>
                            <p>This form is currently disconnected from the backend</p>
                        </div>
                        <h1>Query sequences against the Retrobase database</h1>
                        {errorMessageBox}
                        <LoadingOverlay
                            active={loading}
                            spinner={<FadeLoader />}
                        >
                            <form onSubmit={SubmitForm}>
                                <table style={{ "border-collapse": "collapse" }}>
                                    <tbody>
                                        <tr>
                                            <td>Upload MZIdentML file:</td>
                                            <td>
                                                <input type="file" id="uploadFile" name="uploadFile" value={null} onChange={FormGetFile }></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Tissue: </td>
                                            <td>
                                                <input type="text" id="tissueType" name="tissueType" value={tissue} onChange={FormGetTissue}></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Is this a cancer sample?
                                            </td>
                                            <td>
                                                <select id="cancer" name="cancer" value = {cancer} onChange={FormGetCancer}>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Is this data published?
                                            </td>
                                            <td>
                                                <select id="published" name="published" value={published} onChange={FormGetPublished}>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </td>
                                        </tr>
                                        {publicationInput}
                                        <tr>
                                            <td>Research Name: </td>
                                            <td>
                                                <input type="text" id="researcher" name="researcher" value={researcher} onChange={FormGetResearcher}></input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button>Submit</button>
                            </form>
                        </LoadingOverlay>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default UploadTeData;
