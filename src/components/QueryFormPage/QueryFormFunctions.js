import axios from 'axios';
const config = require('../../jsconfig.json');

export const ValidateSequence = ({ query, seqType, setShowMessage, setMessage }) => {
    var message = ""
    var valid = false
    var seq = query.toUpperCase();
    const invalidCharMsg = "Sequence contains invalid characters."

    switch (seqType) {
        case "dna":
            if (RegExp("^[ATGC]+$").test(seq)) {
                message = invalidCharMsg
                valid = true
            }
            break
        case "protein":
            if ( RegExp("^[ABCDEFGHIKLMNPQRSTUVWXYZ]+$").test(seq) ) {
                message = invalidCharMsg
                valid = true
            }
            break
        default:
            message = "Invalid sequence type"
    };
    return { message, valid }
};


export const QuerySequence = async ({data, query, seqType, requestUrl, history}) => {
    const pushUrl = `/queryresults/${seqType}/${query}`
    const params = {
        "query": query,
        "sequenceType": seqType
    }

    const resp = await axios.get(requestUrl, { params: params })
    if (resp.data) {
        history.push(
            {
                pathname: pushUrl,
                state: { "data": resp.data.body }
            }
        )
    }

    return {
        success: true,
        message: "No error"
    }
}

export const useSubmitSequence = ({
    e, 
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

    const requestUrl = config.queryApiUrl + "/query-sequences-s3";
    const { valid, message } = ValidateSequence({ query, seqType, setLoading, setShowMessage, setMessage })
    if (!valid) {
        setMessage(message)
        setShowMessage(true)
        setLoading(false)
        return
    }

    QuerySequence({query, seqType, requestUrl, history}).catch(res => {
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
    console.log(["zip", "gz"].includes(ext))
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
    loginWithRedirect
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
        loginWithRedirect({ appState: { returnTo: window.location.pathname } })
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