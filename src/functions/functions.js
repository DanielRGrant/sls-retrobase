import axios from 'axios';

export const handleAxiosErrors = (res) => {
    if (!(res instanceof Error)) {
        return {
            success: true,
            message: "No error"
        }
    }

    switch (res.message) {
        case "Network Error":
            return {
                success: false,
                message: "Network error: Check internet connection"
            }
        default:
            return {
                success: false,
                message: res.message
            }
    }
}

export const AxiosGetAndPush = async (params, requestUrl, pushUrl, history) => {

        const res = await axios.get(requestUrl, { params: params }).
            catch(res => res)
        const err = handleAxiosErrors(res)
        if ( !err.success ) return err

        history.push(
            {
                pathname: pushUrl,
                state: { "data": JSON.stringify(res.data.body) }
            }
        )
        return {
            success: true,
            message: "No error"
        }
}

// Wait x amount of miliseconds before next line
export const delay = ms => new Promise(res => setTimeout(res, ms));


export const fetchPageData = async ({ headersParams, requestUrl, errorUrl, history}) => {
    try {
        const res = await axios.get(
            requestUrl,
            headersParams
        )
        return res.data
    } catch (error) {
        history.push({
            pathname: errorUrl,
            state: {
                error:
                    error.message === "Network Error"
                        ? "Network Error; Check internet connection"
                        : "Unspecified Error"
            }
        })
    }
}

export const SubmitFile = async ({metadata, formData, accessToken, getPresignedUrlUrl, history, pushUrl}) => {

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
        console.log(signedURL)
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

