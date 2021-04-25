import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ErrorBoundary } from 'react-error-boundary'
import DetailErrorFallback from '../ErrorFallbacks/DetailErrorFallback'


const ProtectedRouteWithErrorBoundary = ({ component, ...props }) => {
    return (
        <ErrorBoundary key={props.location?.pathname}
            FallbackComponent={DetailErrorFallback}
        >
            <Route
                component={withAuthenticationRequired(component)}
                {...props}
            />

        </ErrorBoundary>
    );
};

export default ProtectedRouteWithErrorBoundary