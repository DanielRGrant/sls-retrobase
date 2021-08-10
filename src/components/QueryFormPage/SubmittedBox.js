import React  from 'react'
import { Link } from 'react-router-dom';
import PopUpBox from "../PopUpBox/PopUpBox"

const FileUploadSuccess = ({isActive, setIsActive}) => {
    const content = (
        <div className="box">
            <h3>Success!</h3>
            <p>File has been sent for processing. When ready, your results will be available at <Link to="/account">My Account</Link></p>
        </div>
    )
    return(
        <PopUpBox
            customClass={"FileUploadSuccess"}
            mainText={content}
            isActive={isActive}
            setIsActive={setIsActive}
        >
        </PopUpBox>
    )
}

export default FileUploadSuccess