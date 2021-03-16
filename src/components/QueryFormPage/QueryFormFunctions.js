import axios from 'axios';
import React, { useState, useEffect  }from 'react';
import { useHistory} from "react-router-dom";

/*export const UseSubmitFile = async (event, metadata, jwt, bucketUrl, presignedRequestUrl) => {
    //Make filename key


    const SubmitFormParams = {
        "headers": {
            "Authorization": jwt
        },
        "params": metadata
    }

/*const metadata = {
    "username": props.user.username
}
props.user.signInUserSession.idToken.jwtToken
https://kvuhomev06.execute-api.us-east-1.amazonaws.com/dev/get-s3-presigned-url

    try {
        setLoading(true)
        const response = await axios.get(bucketUrl, SubmitFormParams)
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

        return {
            "status": 200,
            "message": "File Sent"
        }

    } catch (error) {
        setLoading(false)

        setError(true);
        setErrorMessage("Authorization to upload data not granted")
    } finally {

    }
}
*/



export const ValidateSequence = (seq, seqType) => {
    var message = {
        valid: true,
        message: ""
    }

    const invalidCharMsg = {
        valid: false,
            message: "Sequence contains invalid characters."
    }

    seq = seq.toUpperCase();
    if (seqType === "DNA Sequence") {
        message= (
            RegExp("^[ATGC]+$").test(seq) 
                ? message
                : invalidCharMsg
        )
    } else if (seqType === "Protein Sequence") {
        message = (
            RegExp("^[ABCDEFGHIKLMNPQRSTUVWXYZ]+$").test(seq) 
                ? message
                : invalidCharMsg
        );
    } else {
        message = (
            {
                valid: false,
                message: "Invalid seqType"
            }
        );
    };
    return message
};


/*const AsyncAxiosGetAndPush = async (submitUrl, pollUrl, pushUrl, submitParams) => {

        const response1 = await axios.get(submitUrl, { params: submitParams })


    const token = response1.data.body.token


    while (true) {
        const response2 = await axios.get(pollUrl, { params: { "token": token } })
        if (response2.data.statusCode === 200) {
            props.history.push(
                {
                    pathname: pushUrl,
                    state: { "data": JSON.stringify(response2.data) }
                }
            )
            break
        } else {
            await delay(5000);
        }
    }
}
*/