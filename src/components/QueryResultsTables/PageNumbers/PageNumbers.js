import { useState, useEffect } from 'react'
import { startEndPaginateLinks, getPage } from './functions'
import usePageNumbersScript from './PageNumbersScript'
const config = require('../../../config.json')


const usePageNumbers = ({ respData, setRespData, filters, sortBy, setLoading}) => {
    const getPageHandler = (e) => getPage(e, {currentPage: Number(respData.page), key: respData.key, filters, setRespData, sortBy, setLoading})


    const [start, end] = startEndPaginateLinks({pagesCutOff: 11, numPages: Number(respData.num_pages), currentPage: Number(respData.page)})

    
    const pageNumbers =  usePageNumbersScript({ start, end, currentPage: Number(respData.page), getPage: getPageHandler, numPages: respData.num_pages })
    return (
        respData.num_items 
            ? pageNumbers
            : undefined
    )
}

export default usePageNumbers