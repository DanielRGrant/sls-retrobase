
import axios from 'axios'
import isEqual from 'lodash.isequal'
const config = require('../../../jsconfig.json')


export const applyFilters = async ({
    filters,
    respData,
    setRespData,
    setLoading, 
    lastFilters,
    setLastFilters
}) => {
    if (isEqual(filters, lastFilters)){
        return
    }
    const filtersUrl = config.queryApiUrl + '/query-filter-results'
    const params = {
        params: {
            ...filters,
            "key": respData.key,
        },

    }
    console.log(params)
    setLoading(true)
    const resp = await axios.get(filtersUrl, params)
    const filtRespData = JSON.parse(resp.data.body)
    setRespData(filtRespData)
    setLastFilters({...filters})
}