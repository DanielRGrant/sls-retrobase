import { useHistory } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

const LoginRedirect = () => {
    const history = useHistory()
    const { user } = useAuth0()
    if (user) {
        history.push('/')
    }
    return <></>
}

export default LoginRedirect