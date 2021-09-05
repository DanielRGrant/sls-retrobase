import axios from 'axios';
import { useEffect } from 'react'
import { RequestAndPulse } from '../../functions/functions'
const config = require('../../config.json');

export const ValidateSequence = ({ query, seqType }) => {
    var message = ""
    var valid = false
    var seq = query.toUpperCase();
    const invalidCharMsg = "Sequence contains invalid characters."

    
    switch (seqType) {
        case "dna":
            if (seq.length < 4 ){
                valid = false
                message = "DNA sequence queries must be at least 5 bases"
                break
            }
            if (RegExp("^[ATGC]+$").test(seq)) {
                message = invalidCharMsg
                valid = true
            } else {
                message = invalidCharMsg
            }
            break
        case "protein":
            if ( RegExp("^[ABCDEFGHIKLMNPQRSTUVWXYZ]+$").test(seq) ) {
                valid = true
            } else {
                message = invalidCharMsg
            }
            break
        default:
            message = "Invalid sequence type"
    };
    return { message, valid }
};

export const useSubmitSequence = ({
    e,
    loading,
    setLoading, 
    setShowMessage, 
    setMessage, 
    setLoadingBoxMessage, 
    setLoadingBoxTitle, 
    history
}) => {
    e.preventDefault()
    setLoading(true);
    setLoadingBoxMessage("Query in progress. Please do not refresh...")
    setLoadingBoxTitle("Querying Sequence")

    const seqType = e.target.sequenceType.value;
    const query = e.target.query.value;


    const { valid, message } = ValidateSequence({ query, seqType, setLoading, setShowMessage, setMessage })
    if (!valid) {
        setMessage(message)
        setShowMessage(true)
        //setLoading(false)
        return
    }
    console.log(seqType)
    const masterParams = {
        query,
        "sequenceType": seqType
    }
    const pulseParams = {
        sort_by: seqType === "dna" ? "dna_id" : "prot_id"
    }
    const masterUrl = config.queryApiUrl + "/query-master";
    const pulseUrl = config.queryApiUrl + "/query-return-page";
    const pushUrl = `/queryresults/${seqType}/${query}`;

    const onComplete = (data) => {
        console.log(data)
        if (history && pushUrl) {
            history.push(
                {
                    pathname: pushUrl,
                    state: { "data": data }
                }
            )
        }
    }


    RequestAndPulse({ masterParams, pulseParams, masterUrl, pulseUrl, masterResponseKeys: ["key"], history, delayType: 10000, onComplete}).catch(res => {
        if (res){
            setLoading(false);
            setShowMessage(true);
            setMessage(res.message);
        };
    })
};

export const QueryFile = async ({ metadata, file, accessToken, getPresignedUrlUrl }) => {
    if (!file) {
        return {
            success: false,
            message: "Please select a file"
        }
    }

    if (metadata.uploadTe === "Yes" && (!metadata.tissue || !metadata.researcher || (metadata.published === "Yes" && !metadata.publication))) {
        return {
            success: false,
            message: "You have missed some form fields"
        }
    }

    const requestPayload = {
        "headers": {
            Authorization: `Bearer ${accessToken}`,
        },
        "params": {
            ...metadata,
            "file_name": file.name
        }
    }

    try {
        const response = await axios.get(getPresignedUrlUrl, requestPayload)
        const signedURL = JSON.parse(response.data.body).url
        //rename file to key for presigned upload
        Object.defineProperty(file, 'name', {
            writable: true,
            value: response.data.key
        });
        await axios.put(signedURL, file)
        return {
            success: true,
            message: "Success!"
        }
    } catch (error) {
        return {
            success: false,
            message: "Network Error"
        }
    }
}

const checkFileExtension = ( fname ) => {
    const spl = fname.split(".")
    const ext = spl[spl.length - 1]
    return ["zip", "gz"].includes(ext)
}

export const useSubmitFile = async ({
    e, 
    metadata, 
    file,
    setLoading, 
    setLoadingBoxTitle, 
    setLoadingBoxMessage, 
    setShowMessage, 
    setMessage, 
    setSubmitted,
    isAuthenticated, 
    getAccessTokenSilently, 
    loginWithRedirectWithAppState
}) => {
    e.preventDefault()

    try {
        if ( !checkFileExtension( file.name ) ) {
            setLoading(false)
            setShowMessage(true)
            setMessage("File must be .gz or .zip")
            return
        }        
    } catch {
        setLoading(false)
        setShowMessage(true)
        setMessage("Please choose a file to submit")
        return
    }

    if (!isAuthenticated) {
        loginWithRedirectWithAppState({ appState: { returnTo: window.location.pathname } })
        return
    } else {
        setLoading(true);
        setLoadingBoxTitle("Submitting File")
        setLoadingBoxMessage("Your file is being submitted. Please do not refresh...")

        const accessToken = await getAccessTokenSilently({
            audience: `https://sls-retrobase`,
            scope: "get:data",
        });

        metadata = {...metadata }

        const getPresignedUrlUrl = `${config.queryApiUrl}/requestpresignedurls3`

        QueryFile({ metadata, file, accessToken, getPresignedUrlUrl })
            .then(resp => {
                if (resp.success) {
                    setSubmitted(true)
                    setLoading(false)
                } else {
                    setLoading(false)
                    setShowMessage(true)
                    setMessage(resp.message)
                }
            })
    }
}