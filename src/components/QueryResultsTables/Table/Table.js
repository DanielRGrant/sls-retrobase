import { useEffect, useState } from 'react'
import { processDNAProtCol } from './CustomColumnFunctions'
import { dnaColParams, proteinColParams } from './params';
import useTableScript from './TableScript'
import { sortByFun } from './functions'


const useTable = ({respData, setRespData, setLoading, lastFilters, sortBy, setSortBy}) => {
    const [tableData, setTableData] = useState(respData.data)
    const colParams = respData.seq_type === "dna" ? dnaColParams : proteinColParams;
    useEffect(() => {
        const data = respData.seq_type === 'dna'
            ? processDNAProtCol({ data: respData.data, prot_idURL: "/predictedprotein/", protURL: "/knownprotein/" })
            : respData.data
        setTableData(data);
        setLoading(false)
    }, [respData]);
    const sortByFunTmp = e => sortByFun({ e, respData, setRespData, lastFilters, sortBy, setSortBy, colParams })
    const { dataTable } = useTableScript({ tableData, colParams, "sortByFun": sortByFunTmp });
    return dataTable
}

export default useTable