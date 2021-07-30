import { fetchPageData } from "../../functions/functions"
import axios from 'axios'
import { delay } from '../../functions/functions'
const config = require('../../config.json')

export const fetchData = async function ({ token, history, setData, setLoading, setIsData }) {
    setLoading(true)
    const data = await fetchPageData({
        headersParams: {
            "params": {},
            "headers": {
                Authorization: `Bearer ${token}`,
            }
        },
        requestUrl: `${config.queryApiUrl}/mzid-check-progress/`,
        errorUrl: "/error",
        history: history
    })
    if (data.body.length) {
        setData(data.body)
        setIsData(true)
    } else {
        setIsData(false)
    }
    setLoading(false)
}

export const deleteFileData = async (actionString, token, deleteTe, setPopUpActive) => {
    setPopUpActive(false)
    const url = `${config.queryApiUrl}/mzid-remove-data/`
    const headersParams = {
        "params": {
            "file_id": actionString,
            "delete_te": deleteTe
        },
        "headers": { "Authorization": `Bearer ${token}` }
    }
    await axios.get(url, headersParams) 
    
}

export const addToken = (token, fun) => {
    return (inputString) => fun(inputString, token)
}

export const delayFetchData = async ({ token, history, setData, setIsData, setLoading }) => {
    await delay(500)
    fetchData({ token, history, setData, setIsData, setLoading })
}