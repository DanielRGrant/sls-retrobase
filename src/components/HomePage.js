import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {

    const [rtClasses, setRtClasses] = useState([]);

    /*useEffect(() => {
        axios.get('https://9fqebvawee.execute-api.us-east-1.amazonaws.com/dev/listrtclasses')
            .then(res => {
                setRtClasses(res.data.rt_classes)
            })
    }, [])

    const rtClassesScript = rtClasses.map( rtClass=>{
        return(
            <li>
                <Link to={"/class/" + rtClass[0]}>
                    {rtClass[1]}
                </Link>
            </li>
        )
    })
    */

    return (
            <section className="home-page">
                <div className="box">
                <div className="title-section">
                        <h1>Retrobase</h1>
                            <p>Retrobase is a database of retrotransposon DNA sequences acquired from UCSC Table Browser and proteins translated <i>in silico</i> from these sequences. All protein name labels are predicted using psi-BLAST. Retrobase serves to make these sequences queriable aid in identification of retroviral sequences in proteomic assays. </p>
                        <h3>The Purpose of The Project</h3>
                            <p>I am undertaking this project as a vehicle to develop my skills in serverless application design and development.</p>
                            <p>For more information on the project, <Link to="/documentation/">click here</Link>.</p>
                    </div>
                    <div className="text-boxes">
                    <div className="text-section">	
                            <h2>Data Available</h2>
                            <p>The database is a prototype and presently contains data on the following retrotransposon classes:</p>
                            <ul>
                                <li><Link to={"/class/" + "ERV"}>ERV</Link></li>
                            </ul>
                        </div>
                        <div class="text-section">
                            <h2 className="UnderLineHover"><Link to="/query/"> Query Tool</Link></h2>
                            <p>Querying Retrobase allows exact matching of query sequences (whole or partial) to sequences in the database for identification of retroviral proteins. Queries can be of raw single sequences or MZID-formatted files containing many sequences.</p>
                        </div>
                        <div class="text-section">
                            <h2><a class="UnderLineHover" href='#'>Evolutionary Trees</a></h2>
                            <p>Tool currently unavailable.</p>
                            <p>Evolutionary Trees is a tool for viewing the evolutionary relationships between families of retrotransposons of a given class/superfamily.</p>
                        </div>
                        <div class="text-section">
                            <h2><a class="UnderLineHover" href='#'>Tissue Expression Atlas</a></h2>
                            <p>Tool currently unavailable</p>
                            <p>The Tissue Expression Atlas is tool for community sourcing data on the tissue specificity of expression of retrotransposon protein sequence variants.</p>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default HomePage