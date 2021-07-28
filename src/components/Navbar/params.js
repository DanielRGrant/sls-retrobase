import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick"
import { v4 as uuid } from 'uuid';

// dropdown options
export const toolOptions = [
    {
        "title": "Query",
        "route": "/query"
    },
    {
        "title": "Tissue Expression Atlas",
        "route": "/tissueexpression"
    }
]

export const signInOption = [
    {
        "title": "Sign In / Register",
        "function": undefined
    }
]

export const signedInOptions = [
    {
        "title": "Account",
        "route": "/account"
    },
    {
        "title": "Sign Out",
        "function": undefined
    }
]
