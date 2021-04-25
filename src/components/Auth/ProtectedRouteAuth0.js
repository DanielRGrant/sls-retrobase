import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const ProtectedRoute = ({ component, ...props }) => (
    <Route
        component={withAuthenticationRequired(component)}
        {...props}
    />
);

export default ProtectedRoute;