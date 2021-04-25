import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPageData } from '../../functions/functions'
const config = require("../../jsconfig.json")



const ProteinNameDetail = (props) => {
    const [protein, setProtein] = useState(props.match.params.knownprotein);
    const [proteinFunction, setProteinFunction] = useState([]);
    const [rtClass, setRtClass] = useState([]);
    const [sequence, setSequence] = useState([]);
    const [uniprotAccession, setUniprotAccession] = useState([]);

    useEffect(()=>{
        const fetchDataInput = {
            headersParams: {params: { protein: protein }},
            requestUrl: `${config.queryApiUrl}/knownproteindetail`,
            errorUrl: "/error",
            history: props.history
        }
        fetchPageData(fetchDataInput).
            then(res => {
                setProtein(res.body.protein)
                setProteinFunction(res.body.function)
                setRtClass(res.body.class)
                setSequence(res.body.sequence)
                setUniprotAccession(res.body.accession)
            })
    }, [])
    const proteinFunctionScript = <p> {proteinFunction}</p >

    return (
        <section>
            <div className="box">
                <h1>Protein Name: {protein}</h1>
                <p>All information presented on this page is acquired from the <a href={"https://www.uniprot.org/uniprot/" + uniprotAccession} >Uniprot record, {uniprotAccession}</a>. Click through for much more information on this protein.</p>
                <h2>Function</h2>
                <div>{proteinFunctionScript}</div>

                <h2>Sequence</h2>
                    <p>The following sequence was used for predicting which <i>in silico</i>-translated transcripts from the retrotransposon family, <Link to={/class/ + rtClass}>{rtClass}</Link>, are {protein} sequences: </p>
                    <p class= "wrapped nokern">{sequence}</p>
            </div>
        </section>
    )
}

export default ProteinNameDetail