import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ClassDetail = (props) => {

    const [rtClass, setRtClass] = useState("")
    const [proteins, setProteins] = useState("")
    const [families, setFamilies] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        const FetchData = async () => {
            const rtClass = props.match.params.class
            const response = await axios.get('https://77rvp0ctj2.execute-api.us-east-1.amazonaws.com/dev/classdetail', {params: {"class": rtClass}});
            setRtClass(response.data.body.class)
            setProteins(response.data.body.proteins)
            setFamilies(response.data.body.families)
            setDescription(response.data.body.description)
        }
        FetchData();
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