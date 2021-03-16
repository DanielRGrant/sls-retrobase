import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { useHistory, Link} from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay'
import FadeLoader from 'react-spinners/FadeLoader'
import InlineMessage from '../InlineMessage';
import { signIn } from './AuthFunctions';


const SignInForm = (props) => {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");   

    useEffect(() => {
        const successSignUp = props.location.state.success
        if (successSignUp) {
            setShowMessage(successSignUp);
            setMessage(props.location.state.successMessage);
        }
    },[]);
    
    const fromURL = (typeof props.location.state != "undefined")
        ? props.location.state.from    
        : "/"

    const emailChange = (e) => {
        setEmail(e.target.value)
    };
    const passwordChange = (e) => {
        setPassword(e.target.value)
    };

    const handleSignIn = async (e) => {
        e.preventDefault()
        if (!password || !email) {
            setShowMessage(true);
            setSuccess(false);
            setMessage("Missing email or password");
            return
        }
        setLoading(true);
        const  res = await signIn(email, password, fromURL, history)
        setLoading(false)
        if (!res.success) {
            setMessage(res.message);
            setShowMessage(true);
            setSuccess(false)            
        }
    }

    return (
        <section class="sign-in-up">
            <div className="box">
                <div>
                    <LoadingOverlay
                        active={loading}
                        spinner={<FadeLoader />}
                    >
                    <h1>Sign In</h1>
                        <InlineMessage show={showMessage} success={success} message={message} />
                        <form className="sign-in-up-form" onSubmit={handleSignIn}>
                            <table>
                                <tr>
                                    <th>Email</th>
                                    <td><input className="sign-in-up-input" type="email" name="email" onChange={emailChange}></input></td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <td><input className="sign-in-up-input" type="password" name="password" onChange={passwordChange}></input></td>
                                </tr>
                            </table>
                            <button>Submit</button>
                            <div className="padding-top-2rem">
                                <Link 
                                    to={{"pathname": 'user-registration',
                                        "state": {
                                            "from": fromURL
                                        }
                                    }}>Register
                                </Link>
                            </div>
                        </form>
                    </LoadingOverlay>
               </div>                    
            </div>
        </section>

    )
}
export default SignInForm;