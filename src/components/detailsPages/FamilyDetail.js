import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageData } from '../../functions/functions'
const config = require("../../jsconfig.json")

const FamilyDetail = (props) => {
    
    const [family, setFamily] = useState(props.match.params.family_id)
    const [rtClass, setRtClass] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchDataInput = {
            headersParams: {"params": { "family": family }},
            requestUrl: `${config.queryApiUrl}/familydetail`,
            errorUrl: "/error",
            history: props.history
        }
        fetchPageData(fetchDataInput).
            then(res => {
                setFamily(res.body[0].family)
                setRtClass(res.body[0].class)
                setData(res.body)
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