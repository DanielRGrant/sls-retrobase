import axios from 'axios'
import isEqual from 'lodash.isequal'
import { RequestAndPulse } from '../../../functions/functions'
const config = require('../../../config.json')


export const applyFilters = async ({
    filters,
    respData,
    setRespData,
    loading,
    setLoading, 
    lastFilters,
    setLastFilters,
    seqType
}) => {
    if (isEqual(filters, lastFilters)){
        return
    }
    /*const filtersUrl = config.queryApiUrl + '/query-filter-results'
    const params = {
        params: {
            ...filters,
            "key": respData.key
        }
    }
    
    //const resp = await axios.get(filtersUrl, params)
    //const filtRespData = JSON.parse(resp.data.body)
    //setRespData(filtRespData)
    //setLastFilters({...filters})
    */
    setLoading(true)
    const masterParams = {
        ...filters,
        "key": respData.key,
        sort_by: seqType === "dna" ? "dna_id" : "prot_id"
    }
    const pulseParams = masterParams
    const masterUrl = config.queryApiUrl + "/query-filter-results"
    const pulseUrl = config.queryApiUrl + "/query-return-page"

    const onComplete = (data) => {
        const filtRespData = JSON.parse(data)
        setRespData(filtRespData)
        console.log(filtRespData)
        setLastFilters({ ...filters })
    }

    RequestAndPulse({ masterParams, pulseParams, masterUrl, pulseUrl, delayTime: 10000, onComplete, doContinue: loading})
}