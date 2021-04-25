import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageData } from '../../functions/functions'
const config = require('../../jsconfig.json')


const ClassDetail = (props) => {

    const [rtClass, setRtClass] = useState(props.match.params.class)
    const [proteins, setProteins] = useState("")
    const [families, setFamilies] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        const fetchDataInput = {
            headersParams: {"params": { "class": rtClass }},
            requestUrl: `${config.queryApiUrl}/classdetail`,
            errorUrl: "/error",
            history: props.history
        }
        fetchPageData(fetchDataInput).
            then(res=>{
                setRtClass(res.body.class)
                setProteins(res.body.proteins)
                setFamilies(res.body.families)
                setDescription(res.body.description)
            })
    }, []); 
    
    const proteinsScript = proteins.split("#").map( protein => {
        return <li><Link to={"/knownprotein/" + protein}>{protein}</Link></li>
    });

    const familiesScript = families.split("#").map( family => {
        return <li><Link to={"/family/" + family}>{family}</Link></li>
    });

    const descriptionScript = description.split("\n").map( paragraph => {
        return <p>{paragraph}</p>
    })

    return(
        <section className="classDetail">
            <div className="box">

                <h1> Class: {rtClass}</h1>

                <h2>Description</h2>
                    <div>{descriptionScript}</div>
                <h2>Proteins Encoded By This Class:</h2>
                    <ul>
                        <li>{proteinsScript}</li>
                    </ul>

                <h2>Families</h2>
                    <ul className="familyList">
                        <li>{familiesScript}</li>
                    </ul>
            </div>
        </section>
    )
}

export default ClassDetail