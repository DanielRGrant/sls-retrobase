import React, { useState } from 'react';
import TeGraphComponent from './TeGraphs';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const TeContainer = (props) => {

    const { isAuthenticated, loginWithRedirect } = useAuth0()
    const [tissueSelected, setTissueSelected] = useState(null);
    const SelectTissue = (e) => {
        setTissueSelected(e.target.innerHTML)
    }
    
    const signUpIn = isAuthenticated
        ? (
                <div style={{ "padding-top": "2rem" }}>
                    <Link to={{
                        "pathname": "/query",
                        "state": {"uploadTe": true}
                    }}>
                        Upload New Data
                    </Link>
                </div>
            )
        : (
            <div style={{ "padding-top": "2rem" }}>
                <span > Click here to sign in and upload your own data... </span>
                <span onClick={loginWithRedirect} className="PageNumberLinks">Sign In / Register</span>
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