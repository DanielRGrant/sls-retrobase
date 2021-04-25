import { Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from './ErrorPage'

const RouteWithErrorBoundary = (props) => {
    return (
        <ErrorBoundary key={props.location?.pathname}
            FallbackComponent = {ErrorPage}
        >
            <Route {...props} />
        
        </ErrorBoundary>
    );
};

export default RouteWithErrorBoundary