import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PredictedProteinsWithIdsNoFilter } from '../../functions/functions'


const DnaDetail = (props) => {
    const [dna_id, setId] = useState(props.match.params.dna_id);
    const [family, setFamily] = useState();
    const [rtClass, setRtClass] = useState([]);
    const [sequence, setSequence] = useState([]);
    const [proteinRecords, setProteinRecords] = useState([]);

    useEffect(() => {
        axios.get('https://9fqebvawee.execute-api.us-east-1.amazonaws.com/dev/dnarecorddata/', {params: {"dna_id": dna_id}})
            .then(res => {
                setId(res.data.body.dna_id)
                setFamily(res.data.body.family)
                setRtClass(res.data.body.class)
                setSequence(res.data.body.dna_seq)
                setProteinRecords(res.data.body.protein_data)
            })
    }, [])
 
    const proteinScript = proteinRecords
        && Object.keys(proteinRecords).length === 0 
        && typeof(proteinRecords) === "object"
        ?
            <span>No Proteins Predicted</span>
        :
            proteinRecords.map( (protrec, j) => {
                if (protrec.protein.includes("#")){
                    var protspl = protrec.split("#");
                    var protnames = protspl.map( (protein, i) => {
                        return (
                            <>
                                <Link to={"/knownprotein/" + protein}>
                                    {protein}
                                </Link>
                                {
                                    i !== protspl.length - 1
                                    ? ", "
                                    : null
                                }
                            </> 
                        )
                    });
                    
                } else {
                    var protnames = <Link to={"/knownprotein/" + protrec.protein}>{protrec.protein}</Link>
                }
        
                return (
                    <>
                        <Link>{protrec.prot_id}</Link> ({protnames})
                        {j !== proteinRecords.length - 1
                            ? ", "
                            : null
                        }
                    </>
                )
            })

    console.log(proteinScript)
    return (
        <section>
            <div className="box">
                <h1>DNA Repeat Record: {dna_id}</h1>
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
            </div>
        </section>
    )
}

export default DnaDetail