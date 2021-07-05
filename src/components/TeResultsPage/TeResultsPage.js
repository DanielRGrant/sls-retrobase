import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import useTableScript from "../TableClientSideProcess/react-table-creator";
import TeResultsPageInfoTable from './TeResultsPageInfoTable';
import useFilters from '../TableClientSideProcess/react-table-filters';
import { colParams } from './params';
import { fetchData } from './functions'
import { renderFilters } from './renderHooks';


const TeResultsPage = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState([]);
    const [token, setToken] = useState(null);
    const fileId = props.match.params.fileid

    useEffect(() => {
        getAccessTokenSilently().then(
            token => setToken(token)
        )
        if (token) {
            fetchData({ token, history: props.history, setData, fileId});
        }
    }, [token]);

    var { filteredData, filters } = useFilters({ data, colParams })
    var { dataTable, pageNumbers, itemsPerPageSelect } = useTableScript({ "tableData": filteredData, colParams })
    const filtersScript = renderFilters({filters})

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
                    {filtersScript}
                </div>
                
                <div className="querytable">
                   {dataTable}                    
                </div>
 
                <div className="page-numbers-container">
                    {pageNumbers}
                </div>
                <span>Items per page: {itemsPerPageSelect}</span>
            </div>
        </section>
    )
}

export default TeResultsPage