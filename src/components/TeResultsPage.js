import { useEffect, useState } from 'react'
import { fetchPageData } from '../functions/functions'
import useTableScript from "../components/react-table-creator/react-table-creator"
import TeResultsPageInfoTable from './TeResultsPageInfoTable'
const config = require('../jsconfig.json')


const TeResultsPage = (props) => {
    const [data, setData] = useState([])
    const [fileId, setFileId] = useState(props.match.params.fileid)

    useEffect(() => {
        const fetchData = async function () {
            const fetchDataInput = {
                headersParams: {
                    "params": { "file_id": fileId },
                },
                requestUrl: `${config.queryApiUrl}/tefileresults`,
                errorUrl: "/error",
                history: props.history
            }

            fetchPageData(fetchDataInput)
                .then(res => {
                    setData(res.body)
                })
        }
        fetchData()
    }, []);

    const params = {
        columnHeaders: [
            "peptide_id",
            "seq_observed",
            "protein",
            "prot_id",
            "dna_id",
            "class",
            "family"
        ],
        columnsHaveLinks: {
            "protein": {
                "basePath": "protein",
                "linkPathUseSelf": true
            },
            "prot_id": {
                "basePath": "prot_id",
                "linkPathUseSelf": true
            },
            "dna_id": {
                "basePath": "dna_id",
                "linkPathUseSelf": true
            },
            "class": {
                "basePath": "class",
                "linkPathUseSelf": true
            },
            "family": {
                "basePath": "family",
                "linkPathUseSelf": true
            }
        },
        columnsToFilter: [
            "protein",
            "prot_id",
            "dna_id",
            "class",
            "family",
            "peptide_id"
        ],
        columnHeadersFinal: [
            "Peptide ID",
            "Sequence Observed",
            "Protein",
            "Matched Sequence",
            "DNA ID",
            "Class",
            "Family"
        ],
        customColumns: {}
    }


    var [dataTable, filterDropdownsRaw, pageLinks, itemsPerPageEl] = useTableScript(data, params)
    const filterLabels = ["Protein", "Matched Protein", "DNA ID", "Class", "Family", "Peptide ID"]
    const filterDropdowns = filterDropdownsRaw.map((filterVariable, i) => {
        return (
            <div className="filter-item">
                <div className="filter-element"><span>{filterLabels[i]}</span></div>
                <div className="filter-element">{filterVariable}</div>
            </div>
        )
    })

    return (
        <section className="TeResultsPage">
            <div className="box">
                <h2>Sequence Matches In File ID: {fileId}</h2>
                <div className="infoBox">
                    <h3>Metadata</h3>
                    <TeResultsPageInfoTable item={data.length ? data[0] : []}/>
                </div>
                <div className="query-filters-box">
                    <h3 className="query-filters-heading">Filters</h3>
                    {filterDropdowns}
                </div>
                
                <div className="querytable" style={{"overflow-x": "scroll"}}>
                   {dataTable}                    
                </div>
 
                <div className="page-numbers-container">
                    {pageLinks}
                </div>
                <span>Items per page: {itemsPerPageEl}</span>
            </div>
        </section>
    )
}

export default TeResultsPage