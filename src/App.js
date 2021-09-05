import './App.css';


// Authentication
import Auth0ProviderWithHistory from "./components/Auth/auth0-provider-with-history";
import LoggedOut from './components/Auth/LoggedOut'

// Error handling
import RouteWithErrorBoundary from './components/RouteWithErrorBoundary'
import NotFound from './components/NotFound'

// Components
import HomePage from './components/HomePage/HomePage';
import AccountPage from './components/AccountPage/AccountPage';
import TeResultsPage from './components/TeResultsPage/TeResultsPage';
import QueryResults from './components/QueryResultsTables/QueryResults';
import Navbar from './components/Navbar/Navbar';
import NavbarSearchResults from './components/NavbarSearchResults/NavbarSearchResults'
import QueryFormPage from './components/QueryFormPage/QueryFormPage';
import ClassDetail from './components/detailsPages/ClassDetailPage/ClassDetail';
import FamilyDetail from './components/detailsPages/FamilyDetail/FamilyDetail';
import ProteinNameDetail from './components/detailsPages/ProteinNameDetail/ProteinNameDetail';
import ProteinRecordDetail from './components/detailsPages/ProteinRecordDetail/ProteinRecordDetail';
import DnaDetail from './components/detailsPages/DnaDetail/DnaDetail';
import TeContainer from './components/TissueExpression/TeContainer';
import Documentation from './components/Documentation/Documentation';
import FutureWork from './components/Documentation/FutureWork';
import Instructions from './components/Documentation/Instructions';
import DeploymentInstructions from './components/Documentation/DeploymentInstructions';
import ErrorPage from './components/ErrorPage';


// React Routing
import { BrowserRouter, Switch } from 'react-router-dom';
import ProtectedRouteWithErrorBoundary from './components/Auth/ProtectedRouteWithErrorBoundary'


function App() {
  return (
  <BrowserRouter>  
    <Auth0ProviderWithHistory>   
    <div className="App">
      <Navbar/> 
      <Switch>
          <RouteWithErrorBoundary exact path="/" component={HomePage} />
          <ProtectedRouteWithErrorBoundary exact path="/account" component={AccountPage} />
          <RouteWithErrorBoundary path="/fileresults/:fileid" component={TeResultsPage} />
          <RouteWithErrorBoundary path="/class/:class" component={ClassDetail} />
          <RouteWithErrorBoundary path="/family/:family_id" component={FamilyDetail} />
          <RouteWithErrorBoundary path="/knownprotein/:knownprotein" component={ProteinNameDetail} />
          <RouteWithErrorBoundary path="/dna/:dna_id" component={DnaDetail} />
          <RouteWithErrorBoundary path="/predictedprotein/:protein_id" component={ProteinRecordDetail} />
          <RouteWithErrorBoundary exact path="/query" component={QueryFormPage} />
          <RouteWithErrorBoundary path="/queryresults/:seqtype/:query" component={QueryResults} />
          <RouteWithErrorBoundary path="/searchresults/:search" component={NavbarSearchResults} />

          <RouteWithErrorBoundary path="/tissueexpression" component={TeContainer}/>

          <RouteWithErrorBoundary path="/loggedout" component={LoggedOut}/>

          <RouteWithErrorBoundary path="/documentation" component={Documentation}/>
          <RouteWithErrorBoundary path="/futurework" component={FutureWork} />
          <RouteWithErrorBoundary path="/instructions" component={Instructions} />
          <RouteWithErrorBoundary path="/deploymentinstructions" component={DeploymentInstructions} />
          
          <RouteWithErrorBoundary path="/error" component={ErrorPage}/>
          <RouteWithErrorBoundary component={NotFound}/>

      </Switch>
    </div>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  );
}

export default App;
