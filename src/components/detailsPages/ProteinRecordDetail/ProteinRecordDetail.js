import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../functions';
import { renderProteinNameList, renderProteinFunctions } from './renderHooks';


const ProteinRecordDetail = (props) => {

    const protId = props.match.params.protein_id;
    const [dnaId, setDnaId] = useState([]);
    const [coords, setCoords] = useState([]);
    const [family, setFamily] = useState([]);
    const [rtClass, setRtClass] = useState([]);
    const [sequence, setSequence] = useState([]);
    const [loading, setLoading] = useState(false);
    const [knownProt, setKnownProt] = useState([]);

    useEffect(() => {
        fetchData({ input: protId, requestUrlExtension: '/predictedproteindetail', history: props.history }).
            then(res => {
                setDnaId(res.dna_id)
                setCoords(res.coords)
                setFamily(res.family)
                setRtClass(res.class)
                setSequence(res.prot_seq)
                setKnownProt(res.known_prot)
            })
            .then(()=>setLoading(false))
    }, []);

    const proteinFunctions = renderProteinFunctions(knownProt)
    const proteinNameList = renderProteinNameList(knownProt)

    return (
        <section>
            <div className="box">
                <h1 class="msaIdCatcher">Protein Record: {protId}</h1>
                {!loading && <>
                    <table class= "infotable">
                        <tbody>
                            <tr>
                                <th scope="row">Proteins Predicted:</th>
                                <td>{proteinNameList}</td>
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
                    <p>Note: protein prediction was done using psi-blast. This detects distantly related sequences and can potentially detect sequences related to chromosomally adjacent sequences. Discretion is advised.</p>
                    <div>
                        {proteinFunctions}
                    </div>
                </>}
            </div>
        </section>
    )
}

export default ProteinRecordDetail