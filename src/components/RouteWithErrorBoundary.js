import { Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import DetailErrorFallback from './ErrorFallbacks/DetailErrorFallback'

const RouteWithErrorBoundary = (props) => {
    return (
        <ErrorBoundary key={props.location?.pathname}
            FallbackComponent = {DetailErrorFallback}
        >
            <Route {...props} />
        
        </ErrorBoundary>
    );
};

export default RouteWithErrorBoundary