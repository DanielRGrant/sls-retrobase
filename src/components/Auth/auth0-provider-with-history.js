// src/auth/auth0-provider-with-history.js

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
const config = require('../../jsconfig.json')

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = config.auth0Domain
    const clientId = config.auth0ClientId

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={config.websiteUrl}
            onRedirectCallback={onRedirectCallback}
            audience={config.auth0Audience}
            scope="get:data"
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;