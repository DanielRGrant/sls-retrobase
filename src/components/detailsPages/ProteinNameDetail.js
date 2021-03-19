import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const config = require("../../jsconfig.json")



const ProteinNameDetail = (props) => {
    const [proteinName, setProteinName] = useState(props.match.params.knownprotein);
    const [proteinFunction, setProteinFunction] = useState([]);
    const [rtClass, setRtClass] = useState([]);
    const [sequence, setSequence] = useState([]);
    const [uniprotAccession, setUniprotAccession] = useState([]);

    useEffect(()=>{
        axios.get(config.queryApiUrl + "/knownproteindetail", { params: { "protein": proteinName}})
        .then(res =>{
            console.log(res.data.body)
            setProteinName(res.data.body.protein)
            setProteinFunction(res.data.body.function)
            setRtClass(res.data.body.class)
            setSequence(res.data.body.sequence)
            setUniprotAccession(res.data.body.accession)
        })
    }, [])
    const proteinFunctionScript = <p> {proteinFunction}</p >

    return (
        <section>
            <div className="box">
                <h1>Protein Name: {proteinName}</h1>
                <p>All information presented on this page is acquired from the <a href={"https://www.uniprot.org/uniprot/" + uniprotAccession} >Uniprot record, {uniprotAccession}</a>. Click through for much more information on this protein.</p>
                <h2>Function</h2>
                <div>{proteinFunctionScript}</div>

                <h2>Sequence</h2>
                    <p>The following sequence was used for predicting which <i>in silico</i>-translated transcripts from the retrotransposon family, <Link to={/class/ + rtClass}>{rtClass}</Link>, are {proteinName} sequences: </p>
                    <p class= "wrapped nokern">{sequence}</p>
            </div>
        </section>
    )
}

export default ProteinNameDetail