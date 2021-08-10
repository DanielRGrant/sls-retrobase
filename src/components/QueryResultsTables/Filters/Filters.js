import { useState, useEffect } from 'react';
import useFiltersScript from './FiltersScript'
import { applyFilters } from './functions'


const useFilters = ({ respData, setRespData, filters, setFilters, lastFilters, setLastFilters, setSortBy, setLoading}) => {
    const [filterMessage, setFilterMessage] = useState("")
    useEffect(() => setFilters(
        {
            "filterprotein": "",
            "filterclass": "",
            "filterfamily": ""
        }
    ),[])
    const filterDropdowns= useFiltersScript({ unique: respData.unique, filters });
    const handleApplyFilters = () => applyFilters({ filters, respData, setRespData, setFilterMessage, setLoading, lastFilters, setLastFilters })
        .then(() => {
            const sortBy = respData.seq_type === "DNA"
                ? "dna_id"
                : "protein"
            setSortBy(sortBy)
        })
    return (
        <>
            {Object.keys(respData.unique).length !== 0
                &&
                    < div className = "query-filters-box" >
                        <h3 className="query-filters-heading">Filters</h3>
                        <div className="query-results-filters">
                            {filterDropdowns}
                            <div>
                                <button onClick={handleApplyFilters}>Apply</button>
                            </div>
                            <p>{filterMessage}</p>
                        </div>
                    </div >
            }
        </>
    )
}

export default useFilters