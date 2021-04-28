import './App.css';

import { useEffect, useState } from 'react'

// Authentication
import Auth0ProviderWithHistory from "./components/Auth/auth0-provider-with-history";
import { useAuth0 } from '@auth0/auth0-react';
import LoggedOut from './components/Auth/LoggedOut'

// Error handling
import { ErrorBoundary } from 'react-error-boundary'
import RouteWithErrorBoundary from './components/RouteWithErrorBoundary'
import DetailErrorFallback from './components/ErrorFallbacks/DetailErrorFallback'
import NotFound from './components/NotFound'


// Components
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import TeResultsPage from './components/TeResultsPage';
import DnaSearchResults from './components/QueryResultsTables/DnaSearchResults';
import ProteinSearchResults from './components/QueryResultsTables/ProteinSearchResults';
import Navbar from './components/Navbar';
import NavbarSearchResults from './components/NavbarSearchResults'
import QueryFormPage from './components/QueryFormPage/QueryFormPage';
import FileUploadSuccess from './components/QueryFormPage/FileUploadSuccess';
import ClassDetail from './components/detailsPages/ClassDetail';
import FamilyDetail from './components/detailsPages/FamilyDetail';
import ProteinNameDetail from './components/detailsPages/ProteinNameDetail';
import ProteinRecordDetail from './components/detailsPages/ProteinRecordDetail';
import DnaDetail from './components/detailsPages/DnaDetail';
import TeContainer from './components/TissueExpression/TeContainer';
import Documentation from './components/Documentation';
import ErrorPage from './components/ErrorPage';


// React Routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRouteWithErrorBoundary from './components/Auth/ProtectedRouteWithErrorBoundary'
import ProtectedRouteAuth0 from './components/Auth/ProtectedRouteAuth0'


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
          <RouteWithErrorBoundary path="/filesentsuccess" component={FileUploadSuccess} />
          <RouteWithErrorBoundary path="/proteinquery/:query" component={ProteinSearchResults} />
          <RouteWithErrorBoundary path="/dnaquery/:query" component={DnaSearchResults} />
          <RouteWithErrorBoundary path="/searchresults/:search" component={NavbarSearchResults} />

          <RouteWithErrorBoundary path="/tissueexpression" component={TeContainer}/>

          <RouteWithErrorBoundary path="/loggedout" component={LoggedOut}/>

          <RouteWithErrorBoundary path="/documentation" component={Documentation}/>

          
          <RouteWithErrorBoundary path="/error" component={ErrorPage}/>
          <RouteWithErrorBoundary component={NotFound}/>

      </Switch>
    </div>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  );
}

export default App;
