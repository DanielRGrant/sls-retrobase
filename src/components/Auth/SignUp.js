import { Auth } from 'aws-amplify';
import React, {useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay'
import FadeLoader from 'react-spinners/FadeLoader'
import InlineMessage from '../InlineMessage';
import { signUp } from './AuthFunctions';

const SignUpForm = (props) => {

    const history = useHistory();

    const [success, setSuccess] =useState(false);
    const [showMessage, setShowMessage] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 
    

    const emailChange = (e) => {
        setEmail(e.target.value)
    };
    const passwordChange = (e) => {
        setPassword(e.target.value)
    };
    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const fromURL = (typeof props.location.state !== "undefined")
        ? props.location.state.from
        : "/"

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!email || !password || !confirmPassword) {
            setShowMessage(true);
            setSuccess(false);
            setMessage("All fields must be used")
            return
        }
        if(password !== confirmPassword) {
            setShowMessage(true);
            setSuccess(false);
            setMessage("Passwords do not match")
            return
        } else if (password.length < 8) {
            setShowMessage(true);
            setSuccess(false);
            setMessage("Password must be a minimum of 8 characters")
            return
        }
        setLoading(true);
        const  resp = await signUp(email, password, fromURL, history)
        setLoading(false);
        console.log(resp)
        if (!resp.success) {
            setShowMessage(true);
            setSuccess(false);
            setMessage(resp.message);
        }
    }

    return(
        <section class="sign-in-up">
            <div className="box">

                <h1>Register User</h1>
                <LoadingOverlay
                    active={loading}
                    spinner={<FadeLoader />}
                >
                    <InlineMessage show={showMessage} success={success} message={message}/>
                    <form className="sign-in-up-form" onSubmit={handleSignUp}>
                        <table>
                            <tr>
                                <th>Email</th>
                                <td><input className="sign-in-up-input" type="text" name="username" id="username" onChange={emailChange}></input></td>
                            </tr>

                            <tr>
                                <th>Password</th>
                                <td><input className="sign-in-up-input" type="password" name="password" id="password" onChange={passwordChange}></input></td>
                            </tr>
                            <tr>
                                <th>Confirm Password</th>
                                <td><input className="sign-in-up-input" type="password" name="confirm_password" id="confirm_password" onChange={confirmPasswordChange}></input></td>
                            </tr>
                        </table>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </LoadingOverlay>
                <div className="padding-top-2rem">
                    <span>Already have an account? </span>
                    <Link 
                        to={{ pathname: '/signin', state: { "from": fromURL}}}>
                            Sign In
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm;