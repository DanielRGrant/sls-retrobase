import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const Documentation = () => {

    return(
        <section className="documentation">
            <div className="box">
                <h1>Documentation</h1>
                <h2>Documentation Links</h2>
                <ul>
                    <li><Link to="/futurework">Future work</Link></li>
                    <li><Link to="/instructions">Instructions on using the app</Link></li>
                    <li><Link to="/deploymentinstructions">Deployment instructions</Link></li>
                </ul>
                <h2>The purpose of the project</h2>
                <p>Retrobase is a project I am undertaking both as a vehicle for self-teaching full stack development and cloud architecting skills in AWS, as well as a means of demonstrating my abilities to prospective employers. It is a project in progress. </p>
                <h2>The Specification</h2>
                <p>Retrobase is a database of retrotransposon DNA sequences acquired from UCSC Table Browser, as well as protein sequences predicted <i>in silico</i> from those DNA sequences. DNA sequences were translated into potential protein sequences by a simple algorithm. These potential protein sequences were compared to the sequences of known retrotransposon proteins and, based on similarity, were predicted to be real retrotransposon protein sequences or not. Psi-BLAST was used to achieve this. The database can be queried using the Retrobase Query tool, both by manually entering DNA or protein sequences and by submitting a zipped MZID-formatted file containing peptide sequences. In order to submit a file via Query, the user must register and log in. Another tool under development is Tissue Expression Atlas, which will be an analytics tool, providing graphical insight into which retrotransposon classes, families and proteins are found expressed in different tissues of the body. The data presented in Tissue Expression Atlas will be from files uploaded by users, in Query, who give permission for it to be stored and made publically available.</p>
                <p>Retrobase's frontend is composed of a React.js single page application run from AWS S3. The back end is composed of an AWS-based serverless application, using DynamoDB, S3, S3 Select, Lambda,  API Gateway, Cognito and Amplify. See below in the <Link to='/documentation#architectureDoc'>Architecture</Link> section for details on the architecture.</p>
                <p>Originally, both tools were to be based on PostgreSQL in AWS RDS but I have decided to transition to DynamoDB to address the limitations of scaling with RDS in a serverless application. </p>
                <p>The big challenge to this project is to confront the memory and time limitations in using function as a service when working with very large amounts of data.</p>
                <h2 id="whatIsRetro">What is a retrotransposon?</h2>
                <p>In short, retrotransposons are sections of our genomes that descend from retroviruses. Retroviruses reproduce by inserting their own DNA into the host genome and tricking the host into reading their DNA and making more copies of the virus. When these viral elements enter the genomes of germ-line cells (sperms and egg cells) or foetal cells, all cells descending from those infected cells will contain the viral sequences. These viral sequences can also have the ability to amplify themselves by having the host cell create copies of them and insert them elsewhere in the genome- a process called transposition. As much as 40% of the human genome is composed of retrotransposon sequences, making their study an important part of biology. Thankfully, the majority of these sequences are inactivated by our cells or are mutated to the point of no long functioning, so usually do not cause us harm. However, there are disease conditions involving their activity.</p>

                <h2 id="architectureDoc">The Architecture</h2>
                <p>Up to date documentation on architecture is not available</p>
                <h2>Source Code</h2>
                <p>Back end:</p>
                    <li>
                        <a href="https://github.com/DanielRGrant/serverlessfiles">https://github.com/DanielRGrant/serverlessfiles</a>
                    </li>
                <p>Front end:</p>
                    <li>
                        <a href="https://github.com/DanielRGrant/sls-retrobase-front-end">
                            https://github.com/DanielRGrant/sls-retrobase-front-end
                        </a>
                    </li>
            </div>
        </section>
    )
}

export default Documentation