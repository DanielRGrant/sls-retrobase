import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchData } from '../functions'
import { renderProteinData } from './renderHooks'


const DnaDetail = (props) => {

    const dna_id = props.match.params.dna_id;
    const [family, setFamily] = useState();
    const [rtClass, setRtClass] = useState([]);
    const [sequence, setSequence] = useState([]);
    const [proteinRecords, setProteinRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData({ input: dna_id, requestUrlExtension: "/dnadetail", history: props.history })
            .then(res=>{
                setFamily(res.family)
                setRtClass(res.class)
                setSequence(res.dna_seq)
                setProteinRecords(res.protein_data)
            })
            .then(() => setLoading(false))

    }, []);

    const proteinScript = renderProteinData(proteinRecords)
 

    return (
        <section>
            <div className="box">
            <h1>DNA Repeat Record: {dna_id}</h1>
                {!loading && <>    
                    <table class= "infotable">
                        <tbody>
                        <tr>
                            <th scope="row">Retrotransposon Class: </th>
                            <td><Link to={"/class/" + rtClass}>{rtClass}</Link></td>
                        </tr>
                        <tr>
                            <th scope="row">Family:</th>
                                <td><Link to={"/family/"+ family}>{family}</Link></td>
                        </tr>
                        <tr >
                            <th scope="row">Protein Sequences Predicted:</th>
                            <td>{proteinScript}</td>
                        </tr >
                        </tbody>
                    </table >
                    <h2>DNA sequence</h2>
                        <p class="wrapped nokern">{sequence}</p>
                </>}
            </div>
        </section>
    )
}

export default DnaDetail