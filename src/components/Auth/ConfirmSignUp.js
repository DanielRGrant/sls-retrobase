import { Auth } from 'aws-amplify';
import React, {useState} from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay';
import FadeLoader from 'react-spinners/FadeLoader';
import { confirmSignUp } from './AuthFunctions';
import InlineMessage from '../InlineMessage';


const ConfirmSignUp = (props) => {

    const [confirmation, setConfirmation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("") 
    const history = useHistory();
    const username = props.location.state.username
    const fromURL = props.location.state.from

    const confirmationChange = (e) => {
        setConfirmation(e.target.value)
    }

    const handleConfirmSignUp = async (e) => {
        if (!confirmation){
            setSuccess(false);
            setMessage("Please enter confirmation code sent to your email");
            setShowMessage(true);
            return
        }
        var regex = /^[0-9]+$/;
        if (!confirmation.match(regex) || confirmation.length !== 6) {
            setSuccess(false);
            setMessage("Code should be 6 digit number")
            setShowMessage(true);
            return
        }
        const resp = await confirmSignUp(username, confirmation, fromURL, history)
        if (!resp.success) {
            setSuccess(false);
            setMessage(resp.message);
            setShowMessage(true);
        }
    }

    async function resendConfirmationCode() {
        try {
            setLoading(true);
            await Auth.resendSignUp(username);
            setLoading(false);
            setSuccess(true);
            setMessage("Confirmation code resent!")
            setShowMessage(true);
        } catch (err) {
                setSuccess(false);
                setShowMessage(true);
            if (err.code === "NetworkError") {
                setMessage("NetworkError: Check internet connection")
            } else {
                setMessage("Unanticipated error")
            }
        }
    }

    return (
        <section className="sign-in-up">
            <div className="box">
                <LoadingOverlay
                    active={loading}
                    spinner={<FadeLoader />}
                >
                    <h3>Please enter the confirmation code sent to your email...</h3>
                    <InlineMessage show={showMessage} success={success} message={message}/>
                    <form className="sign-in-up-form" onSubmit={handleConfirmSignUp}>
                            <label for="confirmation">Confirmation Code: </label>
                            <span className="sign-in-up-input-container">
                                <input className="sign-in-up-input" type="text" name="confirmation" id="confirmation" onChange={confirmationChange}></input>
                                <button className="sign-in-up-submit">Submit</button>
                            </span>
                        <div style={{"padding-top": "1rem"}}>
                            <span>Did not receive confirmation code? </span><span class='PageNumberLinks' onClick={resendConfirmationCode}>Resend</span>
                        </div>
                    </form>
                </LoadingOverlay>
            </div>
        </section>
    )
}

export default ConfirmSignUp;