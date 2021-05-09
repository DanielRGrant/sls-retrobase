import { fetchPageData } from "../../functions/functions"
import axios from 'axios'
const config = require('../../jsconfig.json')


export const fetchData = async function (token, history, setData) {
    const accountRequestInput = {
        headersParams: {
            "params": {},
            "headers": {
                Authorization: `Bearer ${token}`,
            }
        },
        requestUrl: `${config.queryApiUrl}/mzid-check-progress/`,
        errorUrl: "/error",
        history: history
    }
    const data = await fetchPageData(accountRequestInput)
    console.log(data)
    if (data) setData(data.body)
}

export const actionsOptionsConstructor = async (token, setRowActions) => {
    // create function that takes string to submit as file_id
    const deleteFileData = async (actionString) => {
        const url = `${config.queryApiUrl}/mzid-remove-data/`
        const headersParams = { 
            "params": { "file_id": actionString },
            "headers": { "Authorization": `Bearer ${token}` } 
        }
        var resp = await axios.get(url, headersParams)
    }
    const actionsOptions = {
        "colIndex": 2, // index of file_id
        "deleteFileData": (actionString) => deleteFileData(actionString)
    }
    setRowActions(actionsOptions)
}