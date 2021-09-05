import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Instructions = () => {

    return (
        <section className="documentation">
            <div className="box">
                <h1>App Instructions</h1>
                <p>To test out the app, try using the Query tool to query some of the following sequences that have matches in the database:</p>
                <h3>Protein sequences:</h3>
                <ul>
                    <li>GQTKSKIKSKYASYLSFIKILL</li>
                    <li>SVSDAPGSCIID</li>
                    <li>R</li>
                </ul>
                <h3>DNA sequences:</h3>
                <ul>
                    <li>ATGGTAGACA</li>
                    <li>GCTACACATAATTATTCTTAT</li>
                    <li>A</li>
                </ul>
                <h3>Query File</h3>
                <p>File querying currently has a bug that will be fixed as soon as possible</p>
                {/*<p>You can also try querying with an MZID file. Download an mzid.gz file from the following link, under project files, and then submit it in the Retrobase Query tool, selecting No to upload to tissue expression atlas:</p>
                <a href="https://www.ebi.ac.uk/pride/archive/projects/PXD026331">https://www.ebi.ac.uk/pride/archive/projects/PXD026331</a>*/}
                <h2>Documentation Links</h2>
                <ul>
                    <li><Link to="/documentation">About the app</Link></li>
                    <li><Link to="/futurework">Future work</Link></li>
                    <li><Link to="/deploymentinstructions">Deployment instructions</Link></li>
                </ul>
            </div>
        </section>
    )
}

export default Instructions