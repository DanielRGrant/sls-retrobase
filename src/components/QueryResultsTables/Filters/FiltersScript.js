import { useState } from 'react';

const useFiltersScript = ({unique, filters}) => {
    if (!unique) return []

    const onFilterChange = (e) => {
        filters["filter" + e.target.id] = e.target.value !== "No filter" 
            ? e.target.value
            : ""
    }

    var filtArr = Object.entries(unique)
    var filterDropdowns = filtArr.map(tmp => {
        const columnHeader = tmp[0]
        var filterVariables = tmp[1];
        filterVariables = ["No filter", ...filterVariables]
        const filterOptions = filterVariables.map(option => {
            return (
                <option id={option} key={option}>
                    {option}
                </option>
            )
        });

        return <select key={columnHeader} id={columnHeader} onChange={onFilterChange}>{filterOptions}</select>
    });
    const filterLabels = [<span>Class:</span>, <span>Family:</span>, <span>Predicted Protein:</span>]
    const filtersMapped = filterDropdowns.map((filterVariable, i) => {
        return (
            <>
                <div className="filter-item">
                    <div className="filter-element">{filterLabels[i]}</div>
                    <div className="filter-element">{filterVariable}</div>
                </div>
            </>
        )
    })
    return filtersMapped
};

export default useFiltersScript