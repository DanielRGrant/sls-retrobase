import React  from 'react'
import { Link } from 'react-router-dom';

const FileUploadSuccess = () => {
    return(
        <section>
            <div className="box">
                <h3>Success!</h3>
                <p>File has been sent for processing. When ready, your results will be available at <Link to="/account">My Account</Link></p>
            </div>
        </section>
    )
}

export default FileUploadSuccess