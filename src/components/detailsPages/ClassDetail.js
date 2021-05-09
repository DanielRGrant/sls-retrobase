import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPageData } from '../../functions/functions'
const config = require('../../jsconfig.json')

const processResponse = ({proteins, families, description}) => {
    const proteinsScript = proteins.split("#").map( protein => {
        return <li><Link to={"/knownprotein/" + protein}>{protein}</Link></li>
    });

    const familiesScript = families.split("#").map( family => {
        return <li><Link to={"/family/" + family}>{family}</Link></li>
    });

    return {
        proteinsScript,
        familiesScript
    }
}

const ClassDetail = (props) => {

    const [rtClass, setRtClass] = useState(props.match.params.class)
    const [response, setResponse] = useState(false)

    useEffect(() => {
        const fetchDataInput = {
            headersParams: {"params": { "class": rtClass }},
            requestUrl: `${config.queryApiUrl}/classdetail`,
            errorUrl: "/error",
            history: props.history
        }
            fetchPageData(fetchDataInput).
                then(res=>{
                    const response = {
                        proteins: res.body.proteins,
                        families: res.body.families
                    }
                    setResponse(response)
                })
    }, []); 

    const { proteinsScript, familiesScript } = 
        response ? processResponse(response) : {proteinScript:null, familiesScript:null}
    

    return(
        <section className="classDetail">
            <div className="box">

                <h1> Class: {rtClass}</h1>

                <h2>Proteins Encoded By This Class:</h2>
                    <ul>
                        <li>{response && proteinsScript}</li>
                    </ul>

                <h2>Families</h2>
                    <ul className="familyList">
                        <li>{response && familiesScript}</li>
                    </ul>
            </div>
        </section>
    )
}

export default ClassDetail