import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import TeGraphComponent from './TeGraphs';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const TeContainer = (props) => {

    const [tissueSelected, setTissueSelected] = useState(null);
    const SelectTissue = (e) => {
        setTissueSelected(e.target.innerHTML)
    }

    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    
    const signUpIn = props.user
        ? (
            <div style={{ "padding-top": "2rem" }}>
                <Link to="/tissueexpressionupload">Upload New Data</Link>
                <div>
                    <span class="PageNumberLinks" style={{ "padding-left": 0}} onClick={signOut}>Sign out</span>
                </div>
            </div>
            )
        : (
            <div style={{ "padding-top": "2rem" }}>
                <span > Click here to sign in and upload your own data... </span>
                <Link to={{
                    "pathname": "/signin",
                    "state": {
                        "from": "/tissueexpression"
                    }
                }}
                    > Sign in / Register
                </Link> 
            </div>
    )
 

    return (
        <section>
            <div className="box">
                <div style={{ "color": "green", "border": "green solid 2px", "padding": "1rem", "margin": "10px 0" }}>
                    <p>Tissue Expression Atlas is under development.</p>
                    <p>This page is connected to a mock API</p>
                </div>
                <h1>Tissue Expression Atlas</h1>
                <div className="TissueGraphsSection">
                    <div className="TissueList">
                        <h3>Select Tissue</h3>
                        <table onClick={SelectTissue}>
                            <tr>
                                Lung
                            </tr>
                            <tr>
                                Heart
                            </tr>
                        </table>
                    </div>
                    <div className="GraphContainer">
                        <TeGraphComponent tissueSelected={tissueSelected}/>
                    </div>
                </div>
                <div>
                    {signUpIn}
                </div>
            </div>
        </section>
    );
};

export default TeContainer