import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import queryRawSeq from '../assets/architecture_diagrams/queryRawSeq.png'
import queryRawSeqSmall from '../assets/architecture_diagrams/queryRawSeqSmall.png'


const Documentation = () => {

    return(
        <section className="documentation">
            <div className="box">
                <h1>Documentation</h1>
                <h2>The purpose of the project</h2>
                <p>Retrobase is a project I am undertaking both as a vehicle for self-teaching full stack development and cloud architecting skills in AWS, as well as a means of demonstrating my abilities to prospective employers. It is a project in progress. </p>
                <h2>The Specification</h2>
                <p>Retrobase is a database of retrotransposon DNA sequences acquired from UCSC Table Browser, as well as protein sequences predicted <i>in silico</i> from those DNA sequences. DNA sequences were translated into potential protein sequences by a simple algorithm. These potential protein sequences were compared to the sequences of known retrotransposon proteins and, based on similarity, were predicted to be real retrotransposon protein sequences or not. Psi-BLAST was used to achieve this. The database can be queried using the Retrobase Query tool, both by manually entering DNA or protein sequences and by submitting a zipped MZID-formatted file containing peptide sequences. In order to submit a file via Query, the user must register and log in. Another tool under development is Tissue Expression Atlas, which will be an analytics tool, providing graphical insight into which retrotransposon classes, families and proteins are found expressed in different tissues of the body. The data presented in Tissue Expression Atlas will be from files uploaded by users, in Query, who give permission for it to be stored and made publically available.</p>
                <p>Retrobase's frontend is composed of a React.js single page application run from AWS S3. The back end is composed of an AWS-based serverless application, using DynamoDB, S3, S3 Select, Lambda,  API Gateway, Cognito and Amplify. See below in the <Link to='/documentation#architectureDoc'>Architecture</Link> section for details on the architecture.</p>
                <p>Originally, both tools were to be based on PostgreSQL in AWS RDS but I have decided to transition to DynamoDB to address the limitations of scaling with RDS in a serverless application. </p>

                <h2 id="whatIsRetro">What is a retrotransposon?</h2>
                <p>In short, retrotransposons are sections of our genomes that descend from retroviruses. Retroviruses reproduce by inserting their own DNA into the host genome and tricking the host into reading their DNA and making more copies of the virus. When these viral elements enter the genomes of germ-line cells (sperms and egg cells) or foetal cells, all cells descending from those infected cells will contain the viral sequences. These viral sequences can also have the ability to amplify themselves by having the host cell create copies of them and insert them elsewhere in the genome- a process called transposition. As much as 40% of the human genome is composed of retrotransposon sequences, making their study an important part of biology. Thankfully, the majority of these sequences are inactivated by our cells or are mutated to the point of no long functioning, so usually do not cause us harm. However, there are disease conditions involving their activity.</p>

                <h2 id="architectureDoc">The Architecture</h2>
                <h3>Database</h3>
                <p>The backend is centered around the following <b>DynamoDB</b> tables:</p>
                <p><b>query_db</b>, contains data on DNA sequences, protein sequences predicted from those DNA sequences and metadata on those sequences. As DynamoDB cannot be queried for substrings (besides begins with), DynamoDB is partnered with S3 Select. User input sequences are queried against parquet files containing the either DNA or protein sequences, along with the corresponding partition keys for the DynamoDB items containing sequence. These queries are orchestrated by Lambda functions, which the partition keys of matching sequences from the S3 select queries and collect the corresponding data from DynamoDB.</p>
                <p><b>prot_db</b> simply contains data on known retrotransposon proteins, including protein functions and sequences. This data does not need to be accessed simultaneously with data retrieved by the Query tool and is therefore kept separately to avoid excessive data duplication. Data in this table need only be retrieved to display details on a given known retrotransposon protein.</p>
                <p>Similarly, <b>class_db</b> contains data on retrotransposon classes for population of detail pages.</p>
                <p><b>te_db</b> contains the data of Tissue Expression Atlas. Users upload MZID files to the application, which are stored in S3 and processed via a series of Lambda functions to extract sequences and query for substring matches to sequences in query_db. In te_db, an item is composed of a peptide ID and sequence that was found to have a match in the database, the ID of the file from which the peptide comes, the ID of the potential (<a href='#'>see The Specification above</a>) protein sequence to which the peptide was matched, the known protein(s) that Retrobase predicts the potential protein to be and the family and class of the sequence from which the potential protein was translated.</p>
                <p><b>family_te_db</b> contains summary descriptive data on retrotransposon families expressed in different tissues.</p>
                <p><b>protein_te_db</b> contains summary descriptive data on retrotransposon families expressed in different tissues.</p>

                <h3>Query</h3>
                <h3>With Raw sequence:</h3>
                <img src={queryRawSeq} className="queryRawDiagram widthheight100 borderBlack1px"/>
                <img src={queryRawSeqSmall} className="queryRawDiagramSmall widthheight100 borderBlack1px" />

                <ol>
                    <li>Client submits an asynchronous GET request to API Gateway: to a resource specifically for either DNA or protein sequences, with a query sequence in its params.</li>
                    <li>API gateway passes the query to a Lambda function. The function creates a token. An item is created in a table, query_progress, in DynamoDB with the token as its key and an attribute, "complete", set to 0. The token is returned to the client via API gateway. The rest of the process will be asynchronous.</li>
                    <li>A second Lambda is invoked asynchronously and is passed the query string and the token created by the first function.</li>
                    <li>If the query string is less than 5 characters, a DynamoDB scan is executed immediately for sequences containing the query, skipping straight to step 6. This is because there will be so many sequences containing such a generic query that it is more efficient to scan the whole table than to run get_item individually on each partition key. If the query length is greater than 5, the Lambda function runs an S3 Select query on an parquet file in S3, composed of DNA or protein sequences and their corresponding partition keys in DynamoDB.</li>
                    <li>The returned partition keys are then used to collect the relevant items from DynamoDB.</li>
                    <li>The data is packaged into a JSON file and put in an S3 bucket.</li>
                    <li>The item in the DynamoDB table, query_progress, with the token create in step 1 as key, has its "completed" attribute set to 1.</li>
                    <li>The client is polling a separate API gateway resource. Sending a GET request to this method with a token triggers a third Lambda function.</li>
                    <li>The third function checks if the item in the query_progress DynamoDB table with the token as its partition key has the "complete" attribute set to 1.</li>
                    <li>If complete is now true, the data is retrieved from S3 and returned to the client via API Gateway.</li>

                </ol>

                <b>Limitations:</b>
                <p>It is possible to simply contain all the relevant columns in the paquet file in S3 on which the initial SELECT query is run. This eliminates the need to query for the remaining values in DynamoDB. Therefore, the current architecture is illogical. I created the current architecture as a means of gaining experience creating asynchronous processes involving multiple cloud resources.</p>

                <h3>With MZID file:</h3>
                <p>Documentation coming soon!</p>

                <h3>Tissue Expression Atlas</h3>
                <p>Documentation coming soon!</p>
            </div>
        </section>
    )
}

export default Documentation