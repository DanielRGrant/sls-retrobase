import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const DeploymentInstructions = () => {

    return (
        <section className="documentation">
            <div className="box">
                <h1>Deployment Instructions</h1>
                <p>Deployment instructions coming soon</p>
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

export default DeploymentInstructions