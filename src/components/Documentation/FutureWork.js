const FutureWork = () => {
    return (
        <section>
            <div className="box">
                <h1>Future Work</h1>
                <h2>Documentation</h2>
                <ul>
                    <li>Finish writing complete documentation</li>
                    <li>Create proper documentation on custom table creators (server side and client side)</li>
                </ul>

                <h2>Technical improvements</h2>
                <ul>
                    <li>Make details page API calls case insensitive</li>
                    <li>In the deployment package, install node modules from a json file</li>
                    <li>Optimise lambda memories and timeouts</li>
                    <li>Will likely be problem returning large file query data when database is bigger.Switch to returning file query results with server - side pagination ?</li>
                    <li>Put all logs from one file query in same log group</li> 
                    <li>Generalise server side pagination, perhaps using a step function</li>
                    <li>Create data processing and analysis workflow automating the complete method used for protein prediction</li>
                    <li>Provide sensible error messages and error codes in API responses and improve specific error handling on client side.</li>
                    <li>Implement a separate redirect subdomain</li>
                    <li>Ensure sufficient logging on serverside.</li>
                    <li>Look into sending client side errors.</li>
                    <li>Implement state sharing with context or reducers on front end</li>
                    <li>On front end, when MZID query fails, make “failed” field clickable with a pop up giving a message explaining why it failed</li>
                    <li>Use S3 select for class data as having all families in one dynamodb item is not possible due to memory constraints</li>
                </ul>

                <h2>Features</h2>
                <ul>
                    <li>If logged in, show queries on account page.</li>
                    <li>Build administrator version of app</li>
                    <li>Create items per page option in server side custom table</li>
                    <li>Add make data public option on file query result page</li>
                    <li>Create tissue expression atlas</li>
                    <li>Include “No results found” in navbar search results</li>
                </ul>
                <h2>Bugs</h2>
                    <ul>
                        <li>Fix front end when window has mobile dimensions:</li>
                        <ul>
                            <li>search input doesn’t appear on click</li>
                            <li>front page title overflows window</li>
                            <li>te results page filters overflows window</li>
                            <li>navbar account dropdown overlaps other icons when bellow ~250px</li>            
                        </ul>

                        <li>Fix ‘start’ page link on query results page numbers(front end)</li>
                        <li>Handle lambda timeouts</li>
                        <li>Filter and sort known protein names of results when multiple proteins are predicted for one record(when protein name is 'name#name')</li>
                        <li>Handle no sequences found in query file on front end</li>
                        <li>Stream files from S3 in sls - mzid - parse Lambda to prevent an error resulting from a file submitted that is too large</li>
                        <li>Client side tables: When sort, deselect row or maintain selection of same row.The current behaviour is to remember the content of the selected row before sorting the table but the bullet of the row of the same index remains checked.</li>
                    </ul>
            </div>
        </section>
    )
}

export default FutureWork