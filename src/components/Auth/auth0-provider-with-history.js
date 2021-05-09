// src/auth/auth0-provider-with-history.js

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
const config = require('../../jsconfig.json')

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();

    const onRedirectCallback = (appState) => {
        var returnTo = appState?.returnTo
        returnTo = (
            returnTo.startsWith('/dnaquery') || returnTo.startsWith('/protquery')
                ? '/query' 
                : returnTo
        )

        returnTo = (
            returnTo==='/loggedout' || (!returnTo)
                ? '/' 
                : returnTo
        )
        history.push(returnTo || null);
    };
    return (
        <Auth0Provider
            domain={config.auth0Domain}
            clientId={config.auth0ClientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={config.auth0Audience}
            scope="get:data"
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;