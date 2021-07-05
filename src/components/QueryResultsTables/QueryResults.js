import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTable from './Table/Table'
import useFilters from './Filters/Filters'
import usePageNumbers from './PageNumbers/PageNumbers'
import useResponseMetadata from './ResponseMetadata'


const QueryResults = (props) => {  
    const [respData, setRespData] = useState(JSON.parse(props.location.state.data));
    const [filters, setFilters] = useState({});
    const [lastFilters, setLastFilters] = useState({})
    const [loading, setLoading] = useState(false);
    const [ sortBy, setSortBy ] = useState("")
    const seqType = props.match.params.seqtype;
    
    //Hooks
    const dataTable = useTable({ respData, setRespData, setLoading, seqType, lastFilters, sortBy, setSortBy });
    const filtersScript = useFilters({ respData, setRespData, filters, setFilters, lastFilters, setLastFilters, setSortBy, setLoading });
    const pageNumbers = usePageNumbers({ respData, setRespData, filters, setLoading, sortBy})
    const responseMetadata = useResponseMetadata({respData, params: props.match.params})

    return (
        <section className="query-results-page">
            <div className="box queryResults">
                <h1>Query Results</h1>
                    <>{responseMetadata}</>
                    <>{filtersScript}</>
                {!loading && (   
                    <>
                        <div className="querytable">{dataTable}</div>
                        <div className="border-top pt-3">
                            <small className="text-muted">
                                <Link to="/query"><small>Search Again</small></Link>
                            </small>
                        </div>
                        <div className="page-numbers-container">{pageNumbers}</div>
                    </>
                )}

            </div>
        </section>
    )
}

export default QueryResults
