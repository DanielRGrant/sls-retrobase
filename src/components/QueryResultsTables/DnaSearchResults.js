import React from 'react';
import { Link } from 'react-router-dom';
import useTableScript from './ProcessingData/react-table-creator'
import { processDNAQueryProts, FilterDNAProts } from './ProcessingData/CustomColumnFunctions'


const prot_idURL = "/predictedprotein/"
const protURL = "/knownprotein/"


const DnaSearchResults = (props) => {

    const params = {
        columnHeaders: [
            "dna_id",
            "class",
            "family",
            "protein",
            "coords",
            "all_rec_prots"
        ],
        columnsHaveLinks: {
            "dna_id": {
                "basePath": "/dna/",
                "linkPathUseSelf": true
            },
            "class": {
                "basePath": "/class/",
                "linkPathUseSelf": true
            }
        },
        columnsToFilter: [
            "class",
            "family",
            "all_rec_prots"
        ],
        excludeColumnHeader: [
            "all_rec_prots"
        ],
        columnHeadersFinal: [
            "DNA Record ID",
            "Class",
            "Family",
            "Protein Record ID (Predicted Proteins)",
            "Genomic Coordinates"
        ],
        customColumns: {
            "all_rec_prots": (args) => {
                return FilterDNAProts(args)
            }
        }
    }
    
    const data = JSON.parse(props.location.state.data)
    const processedData = processDNAQueryProts(data, prot_idURL, protURL)
    
    var [dataTable, filterDropdownsRaw, pageLinks] = useTableScript(processedData, params)

    const filterLabels = [<span>Class:</span>, <span>Family:</span>, <span>Predicted Protein:</span>]
    const filterDropdowns = filterDropdownsRaw.map( (filterVariable, i) => {
        return (
            <div className="filter-item">
                <div className="filter-element">{filterLabels[i]}</div>
                <div className="filter-element">{filterVariable}</div>                
            </div>
        )
    })

    return (
        <section className="query-results-page">
            <div className="box queryResults">
                <h1>Query Results</h1>
                    <div className="query-filters-box">
                        <h3 className="query-filters-heading">Filters</h3>

                        <div className="query-results-filters">
                            {filterDropdowns}
                        </div>
                    </div>


                    <div className="querytable">{dataTable}</div>


                    <div className="border-top pt-3">
                        <small className="text-muted">
                            <Link to="/query"><small>Search Again</small></Link>
                        </small>
                    </div>
                    <div className="page-numbers-container">{pageLinks}</div>
            </div>
        </section>
    )
}

export default DnaSearchResults
