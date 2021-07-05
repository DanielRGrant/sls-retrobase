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

export const QueryFile = async ({ metadata, formData, accessToken, getPresignedUrlUrl, history, pushUrl }) => {

    const requestPayload = {
        "headers": {
            Authorization: `Bearer ${accessToken}`,
        },
        "params": metadata
    }

    if (!formData.file) {
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
    try {
        const response = await axios.get(getPresignedUrlUrl, requestPayload)
        const signedURL = JSON.parse(response.data.body).url
        //rename file to key for presigned upload
        Object.defineProperty(formData.file, 'name', {
            writable: true,
            value: response.data.key
        });
        await axios.put(signedURL, formData.file)
        history.push("/filesentsuccess")
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

export const useSubmitFile = async ({
    e, 
    metadata, 
    file, 
    setLoading, 
    setLoadingBoxTitle, 
    setLoadingBoxMessage, 
    setShowMessage, 
    setMessage, 
    history,
    isAuthenticated, 
    getAccessTokenSilently, 
    user, 
    loginWithRedirect
}) => {
    e.preventDefault()

    if (!isAuthenticated) {
        loginWithRedirect()
        return
    } else {
        setLoading(true);
        setLoadingBoxTitle("Submitting File")
        setLoadingBoxMessage("Your file is being submitted. Please do not refresh...")

        const accessToken = await getAccessTokenSilently({
            audience: `https://sls-retrobase`,
            scope: "get:data",
        });

        metadata = {...metadata, user }

        const formData = { file }

        const getPresignedUrlUrl = `${config.queryApiUrl}/requestpresignedurls3`
        const pushUrl = "/filesentsuccess"

        QueryFile({ metadata, formData, accessToken, getPresignedUrlUrl, history, pushUrl })
            .then(resp => {
                if (!resp.success) {
                    setLoading(false)
                    setShowMessage(true)
                    setMessage(resp.message)
                }
            })
    }
}