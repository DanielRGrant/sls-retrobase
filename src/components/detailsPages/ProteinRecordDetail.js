import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const ProteinRecordDetail = (props) => {


    const [proteinNames, setProteinNames] = useState([])
    const [protId, setProtId] = useState([])
    const [dnaId, setDnaId] = useState([])
    const [coords, setCoords] = useState([])
    const [family, setFamily] = useState([])
    const [rtClass, setRtClass] = useState([])
    const [sequence, setSequence] = useState([])
    const [knownProt, setKnownProt] = useState([])


    useEffect(() => {
        const prot_id = props.match.params.protein_id
        axios.get('https://9fqebvawee.execute-api.us-east-1.amazonaws.com/dev/proteinrecorddata/', {"params": {"prot_id": prot_id}})
            .then(res => {
                setProtId(res.data.body.prot_id)
                setDnaId(res.data.body.dna_id)
                setCoords(res.data.body.coords)
                setFamily(res.data.body.family)
                setRtClass(res.data.body.class)
                setSequence(res.data.body.prot_seq)
                setKnownProt(res.data.body.known_prot)
            }).
            catch( res => {
                console.log(res)
            })
    }, []);


    const proteinNameListScript = knownProt.map( (proteinName, i) => {
        
        var tmp = (
            <Link to={"/knownprotein/" + proteinName.protein}>
                <span>{proteinName.protein}</span>
            </Link>
        )
        
        if (i !== 0) {
            return <span>, {tmp}</span>
        } else {
            return <span>{tmp}</span>
        }
    });

    const proteinFunctions = knownProt.map( proteinName => {
        return(
            <div>
                <h2> {proteinName.protein}</h2>
                <h3> Function </h3>
                <p><i>Information taken from Uniprot</i> <a href={"https://www.uniprot.org/" + proteinName.accession}>({proteinName.accession})</a></p>
                    <p>{proteinName.function}</p>
                    <h3>Reference Sequence</h3>
                        <p class="wrapped nokern">{proteinName.sequence}</p>
            </div>

        )
    })
    return (
        <section>
            <div className="box">
                <h1 class="msaIdCatcher">Protein Record: {protId}</h1>
                <table class= "infotable">
                    <tbody>
                        <tr>
                            <th scope="row">Proteins Predicted:</th>
                            <td>{proteinNameListScript}</td>
                        </tr>			
                        <tr>
                            <th scope="row">Retrotransposon Class: </th>
                            <td><Link to={"/class/" + rtClass}>{rtClass}</Link></td>
                        </tr>
                        <tr>
                            <th scope="row">Family:</th>
                            <td><Link to={"/family/" + family}>{family}</Link></td>
                        </tr>
                        <tr>
                            <th scope="row">Translated From DNA Record:</th>
                            <td><Link to={"/dna/" + dnaId}>{dnaId}</Link></td>
                        </tr>
                        <tr>
                            <th scope="row">DNA Record Coordinates:</th>
                            <td>{coords}</td>
                        </tr>
                    </tbody>
                </table>
                <h2>Sequence</h2>
                <p class="wrapped nokern">{sequence}</p>

                <h1>Predicted Proteins</h1>
                <p>Note: protein prediction was done using psi-blast. This detects distantly related sequences and can potentially detect sequencs related to adjacent sequences. Discretion is advised.</p>
                <div>
                    {proteinFunctions}
                </div>
            </div>
        </section>
    )
}

export default ProteinRecordDetail