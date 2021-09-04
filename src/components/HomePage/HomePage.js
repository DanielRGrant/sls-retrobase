import { Link } from 'react-router-dom'
import ClassList from './ClassList'


const HomePage = () => {
    return (
        <section className="home-page">
            <div className="box">
                <div className="inlineMessage fail big">
                    <p className="align-centered">Unfinished Prototype</p>
                    <p className="align-centered smallertext">
                        This application is an unfinished prototype. A list of technical improvements and features to make is available: <Link to='/futurework'>Bugs, improvements and features</Link>
                    </p>
                </div>
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
                        <ClassList/>
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