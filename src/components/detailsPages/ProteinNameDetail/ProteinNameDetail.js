import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../functions'


const ProteinNameDetail = (props) => {
    const protein = props.match.params.knownprotein;
    const [proteinFunction, setProteinFunction] = useState([]);
    const [rtClass, setRtClass] = useState([]);
    const [sequence, setSequence] = useState([]);
    const [uniprotAccession, setUniprotAccession] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchData({ input: protein, requestUrlExtension: '/knownproteindetail', history: props.history }).
            then(res => {
                setProteinFunction(res.function)
                setRtClass(res.class)
                setSequence(res.sequence)
                setUniprotAccession(res.accession)
            }).then(() => setLoading(false))
    }, [])
    const proteinFunctionScript = <p> {proteinFunction}</p >

    return (
        <section>
            <div className="box">
                <h1>Protein Name: {protein}</h1>
                {!loading && <>
                    <p>All information presented on this page is acquired from the <a href={"https://www.uniprot.org/uniprot/" + uniprotAccession} >Uniprot record, {uniprotAccession}</a>. Click through for much more information on this protein.</p>
                    <h2>Function</h2>
                    <div>{proteinFunctionScript}</div>

                    <h2>Sequence</h2>
                        <p>The following sequence was used for predicting which <i>in silico</i>-translated transcripts from the retrotransposon family, <Link to={/class/ + rtClass}>{rtClass}</Link>, are {protein} sequences: </p>
                        <p class= "wrapped nokern">{sequence}</p>
                </>}
            </div>
        </section>
    )
}

export default ProteinNameDetail