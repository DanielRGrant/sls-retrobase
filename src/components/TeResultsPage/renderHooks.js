export const renderFilters = ({filters}) => {
    const filterLabels = ["Protein", "Matched Protein", "DNA ID", "Class", "Family", "Peptide ID"]
    const filterDiv = filters && filters.map((filterVariable, i) => {
        return (
            <div className="filter-item">
                <div className="filter-element"><span>{filterLabels[i]}</span></div>
                <div className="filter-element">{filterVariable}</div>
            </div>
        )
    })
    return filterDiv
}