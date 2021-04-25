import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MultiValStringColLink } from '../react-table-creator/CustomColumnFunctions'
import useTableScript from '../react-table-creator/react-table-creator';


const ProteinSearchResults = (props) => {
    const dataResponse = JSON.parse(props.location.state.data)
    const query = props.match.params.query;

    const params = {
        columnHeaders: [
            "prot_id",
            "class",
            "family",
            "protein",
            "dna_id",
            "coords"
        ],
        columnHeadersFinal: [
            "Protein Record ID",
            "Class",
            "Family",
            "Predicted Protein(s)",
            "DNA Record ID",
            "DNA Record Genomic Coordinates"
        ],
        columnsHaveLinks: {
            "prot_id": {
                "basePath": "/predictedprotein/",
                "linkPathUseSelf": true
            },
            "dna_id": {
                "basePath": "/dna/",
                "linkPathUseSelf": true
            },
            "family": {
                "basePath": "/family/",
                "linkPathUseSelf": true
            },
            "class": {
                "basePath": "/class/",
                "linkPathUseSelf": true
            },
        },
        columnsToFilter: [
            "class",
            "family",
            "protein"
        ],
        customColumns: {
            "protein": (args) => {
                const string_divider = "#";
                const baseurl = "/knownprotein/";
                return MultiValStringColLink(args, string_divider, baseurl)
            }
        }
    }

    var [dataTable, filterDropdownsRaw, pageLinks] = useTableScript(dataResponse, params)

    const filterLabels = [<span>Class:</span>, <span>Family:</span>, <span>Predicted Protein:</span>]
    const filterDropdowns = filterDropdownsRaw.map((filterVariable, i) => {
        return (
            <div className="filter-item">
                <div className="filter-element">{filterLabels[i]}</div>
                <div className="filter-element">{filterVariable}</div>
            </div>

        )
    })

    const proteinQueryTable = (
        <section className="prot-query-results-page">
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
    
    return(
        <>
            {proteinQueryTable}
        </>
    )
}

export default ProteinSearchResults