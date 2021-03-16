import { Auth } from 'aws-amplify';

export const signIn = async (email, password, fromURL, history) => {
    try {
        await Auth.signIn(email, password);
        history.push(fromURL)
        return {
            success: true,
            message: "Successfully signed in"
        }
    } catch (error) {
        if (error.code === "NotAuthorizedException") {
            return {
                success: false,
                message: "Incorrect email or password"
            }
        } else if (error.code === "UserNotConfirmedException") {
            return {
                success: false,
                message: 
                    <div>
                        <p>Registration attempted with this email. Email needs validating.</p>
                        <p>To resend confirmation code, 
                            <span class="PageNumberLinks" onClick={
                                () => resendConfirmationCode(email, fromURL, history)
                            }>click here</span>
                        </p>
                    </div>
            }
        } else if (error.code === "NetworkError") {
            return {
                success: false,
                message: "NetworkError: Check internet connection"
            }
        }
    }
}

export const signUp = async (email, password, fromURL, history) => {
    try {
        await Auth.signUp({ username: email, password, attributes: { "email": email } })
        history.push({
            pathname: '/confirmsignup',
            state: {
                "username": email,
                "from": fromURL
            }
        });
    } catch (error) {
        console.log("Error signing up: ", error)
        if (error.code === "UsernameExistsException") {
            return {
                success: false,
                message: (
                    <div>
                        <p>Email already registered.</p>
                        <p>If you attempted to register this email and need to validate it,  
                            <span class="PageNumberLinks" onClick={
                                () => resendConfirmationCode(email, fromURL, history)
                            }>click here</span>
                        </p>
                    </div>
                )
            }
        } else { 
            return {
                success: false,
                message: "Unknown error"
            }
        }
    };
};

export const confirmSignUp = async (username, confirmation, fromURL, history) => {
    try {
        await Auth.confirmSignUp(username, confirmation);
        history.push({
            pathname: '/signin',
            state: {
                "from": fromURL,
                "success": true,
                "successMessage": "Account registered! You may now sign in."
            }
        })
    } catch (error) {
        if (error.code === "CodeMismatchException") {
            return {
                success: false,
                message: "Incorrect code"
            }
        } else if (error.code === "NetworkError") {
            return {
                success: false,
                message: "NetworkError: Check internet connection"
            }            
        }
    }
}

const resendConfirmationCode = async (email, fromURL, history) => {
    console.log("email: ", email)
    console.log("fromURL: ", fromURL)
    console.log("history: ", history)
    try {
        await Auth.resendSignUp(email);
        history.push({
            pathname: '/confirmsignup',
            state: {
                "username": email,
                "from": fromURL
            }
        });
    } catch (error) {
        console.log(error.code)
        if (error.code === "InvalidParameterException"){
            
            return {
                success: false,
                message: error.message
            }
        }
    }
}