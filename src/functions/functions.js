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

        const res = await axios.get(requestUrl, { params: params })
            .catch(res => res)
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



export const RequestAndPulse = async ({ masterParams, pulseParams = {}, masterUrl, pulseUrl, masterResponseKeys, delayTime, onComplete, doContinue=true }) => {
    var isMounted = true
    const masterResp = await axios.get(masterUrl, { params: masterParams })
    for (let i in masterResponseKeys) {
        console.log(masterResponseKeys[i])
        pulseParams = {
            ...pulseParams,
            [masterResponseKeys[i]]: masterResp.data.body[masterResponseKeys[i]]
        }
    }
    console.log(pulseParams)
    if (isMounted) {
        var delayTime = 10000
        while (true) {
            console.log(doContinue)
            console.log("Looping with delay: ", delayTime)
            console.log(pulseParams)
            const resp = await axios.get(
                pulseUrl,
                { params: pulseParams}
            )
            if (resp.data.statusCode === 200) {
                console.log("success")
                onComplete(resp.data.body)
                break
            } else if (delayTime >= 640000) {
                console.log("failed")
                return (
                    {
                        success: false,
                        message: "Request timed out. Request must complete in under 15 minutes"
                    }
                )
            } else if (resp.data.statusCode === 404) {
                //setDelaying(delayTime)
                //if (!doContinue) break
                await delay(delayTime)
                delayTime *= 2
                console.log("delaying")
            } else {
                console.log(resp)
                break
            }
        }
    }
    return {
        success: true,
        message: "No error"
    }
}