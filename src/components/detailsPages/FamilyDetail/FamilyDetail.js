import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../functions'
import { renderDnaList } from './renderHooks'

const FamilyDetail = (props) => {
    
    const family = props.match.params.family_id
    const [rtClass, setRtClass] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData({ input: family, requestUrlExtension: "/familydetail", history: props.history })
            .then(res => {
                console.log(res)
                setRtClass(res[0].class)
                setData(res)
            }).then(() => setLoading(false))
    }, []);
    
    const dnaListScript = renderDnaList(data)

    return (
        <section>
            <div className="box">
                <h1>{family}</h1>
                {!loading && <>
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
                </>}
            </div>
        </section>
    )
}

export default FamilyDetail