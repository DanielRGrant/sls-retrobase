
import { useState } from 'react';
import {
    collectUniqueValsFun,
    FilterOut,
    createFilterStateObj,
} from './functions'

const useFilters = ({ data, colParams }) => {
    const { columnsToFilter, customFilterColumns, columnHeaders } = colParams
    const { collectUniqueVals, objForFilterState } = createFilterStateObj(columnsToFilter)
    const [filters, setFilters] = useState(objForFilterState)

    if (!columnsToFilter.length) return { filteredData: data }
    
    // iteratively create table rows
    var outData = [] // collect table rows
    for (var k = 0; k < data.length; k++) {
        var excludeRow = false;
        var entry = data[k];
        var value = null

        // iterate over column headers
        for (var j = 0; j < columnHeaders.length; j++) {
            var columnHeader = columnHeaders[j]
            var value = entry[columnHeader]
            if (Object.keys(customFilterColumns).includes(columnHeader)) {
                var args = {
                    value,
                    entry,
                    filters,
                    columnHeader,
                    excludeRow,
                    columnsToFilter,
                    collectUniqueVals
                }
                var excludeRow  = customFilterColumns[columnHeader](args)
            } else {
                excludeRow = FilterOut({ value, columnsToFilter, appliedFilter: filters[columnHeader], columnHeader, excludeRow })
                collectUniqueValsFun({ value, columnsToFilter, columnHeader, collectUniqueVals })
            }
        }
        // Add row or filter out
        if (!excludeRow) outData.push(entry)
    }

    // Filters
    // Use state to set filter values when user selects them
    const handleFilter = (e) => {
        const filtersNew = { ...filters }
        filtersNew[e.target.id] = e.target.value
        setFilters(filtersNew)
    }

    // Create filter option dropdowns
    const UniqueVals = Object.entries(collectUniqueVals)
    var filterDropdowns = UniqueVals.map(filterVariables => {
        var columnHeader = filterVariables[0]
        filterVariables = filterVariables[1];
        const filterOptions = filterVariables.map(option => {
            return (
                <option id={option} key={option}>
                    {option}
                </option>
            )
        });

        return <select key={columnHeader} id={columnHeader} onChange={handleFilter}>{filterOptions}</select>
    });
    return { filteredData: outData, filters: filterDropdowns}
}

export default useFilters