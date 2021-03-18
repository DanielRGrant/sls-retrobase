import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
const config = require("../../jsconfig.json")

const FamilyDetail = (props) => {
    
    const [family, setFamily] = useState(props.match.params.family_id)
    const [rtClass, setRtClass] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(config.queryApiUrl + "/familydetail", { "params": { "family": family}})
            .then(res => {
                setFamily(res.data.body[0].family)
                setRtClass(res.data.body[0].class)
                setData(res.data.body)
            })
    }, []);
    
    const dnaListScript = data.map( (item, i) => {
        return(
            <>
                {(i !== 0)
                    ? <Link to={"/dna/" + item.dna_id}>, {item.dna_id}</Link>
                    : <Link to={"/dna/" + item.dna_id}>{item.dna_id}</Link>
                }
            </>
        )
    })

    return (
        <section>
            <div className="box">
                <h1>{family}</h1>
                <table className="infotable">
                    <tbody>
                        <tr>
                            <th>Class: </th>
                            <td><Link to={"/class/" + rtClass}>{rtClass}</Link></td>
                        </tr>
                        <tr>
                            <th>DNA Sequences: </th>
                            <td>{dnaListScript}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default FamilyDetail