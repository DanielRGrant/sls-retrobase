import React, { useEffect, useState } from 'react';
import { processResponse } from './renderHooks'
import { fetchData } from '../functions'


const ClassDetail = (props) => {
    const [response, setResponse] = useState(false)
    const [loading, setLoading] = useState(true)
    const rtClass = props.match.params.class

    useEffect(() => {
        setLoading(true)
        fetchData({input: rtClass, requestUrlExtension: "/classdetail", history: props.history, setResponse})
            .then(res => setResponse(res))
            .then(()=>setLoading(false))
    }, []); 

    const { proteinsScript, familiesScript } = 
        response ? processResponse(response) : {proteinScript:null, familiesScript:null}
    
    return(
        <section className="classDetail">
            <div className="box">               
                <h1> Class: {rtClass}</h1>
                {!loading && <>
                    <h2>Proteins Encoded By This Class:</h2>
                        <ul>
                            <li>{response && proteinsScript}</li>
                        </ul>

                    <h2>Families</h2>
                        <ul className="familyList">
                            <li>{response && familiesScript}</li>
                        </ul>
                </>}
            </div>
        </section>
    )
}

export default ClassDetail