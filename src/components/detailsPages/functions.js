import { fetchPageData } from '../../functions/functions'
const config = require('../../config.json')
const errorUrl = "/error"


export const fetchData = async ({ input, requestUrlExtension, history }) => {
    const fetchDataInput = {
        headersParams: { "params": { "input": input } },
        requestUrl: config.queryApiUrl + requestUrlExtension,
        errorUrl: errorUrl,
        history: history
    }
    const data =  await fetchPageData(fetchDataInput)
    return data.body
}