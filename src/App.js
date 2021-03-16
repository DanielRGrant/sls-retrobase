import './App.css';

// Error handling
import { ErrorBoundary } from 'react-error-boundary'
import RouteWithErrorBoundary from './components/RouteWithErrorBoundary'
import DetailErrorFallback from './components/ErrorFallbacks/DetailErrorFallback'
import NotFound from './components/NotFound'


// Components
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import DnaSearchResults from './components/QueryResultsTables/DnaSearchResults';
import ProteinSearchResults from './components/QueryResultsTables/ProteinSearchResults';
import Navbar from './components/Navbar';
import NavbarSearchResults from './components/NavbarSearchResults'
import QueryFormPage from './components/QueryFormPage/QueryFormPage';
import ClassDetail from './components/detailsPages/ClassDetail';
import FamilyDetail from './components/detailsPages/FamilyDetail';
import ProteinNameDetail from './components/detailsPages/ProteinNameDetail';
import ProteinRecordDetail from './components/detailsPages/ProteinRecordDetail';
import DnaDetail from './components/detailsPages/DnaDetail';
import TeContainer from './components/TissueExpression/TeContainer';
import UploadTeData from './components/TissueExpression/TeUserUpload';
import SignUpForm from './components/Auth/SignUp';
import SignInForm from './components/Auth/SignIn';
import ConfirmSignUp from './components/Auth/ConfirmSignUp';
import Documentation from './components/Documentation';

// React hooks
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {useState, useEffect } from 'react';

// Amplify
import Amplify, { Auth } from 'aws-amplify';
import { Hub } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


function App() {
  let [user, setUser] = useState(null)
  useEffect(() => {
    let updateUser = async authState => {
      try {
        let user = await Auth.currentAuthenticatedUser()
        setUser(user)
      } catch {
        setUser(null)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
   
    updateUser() // check manually the first time because we won't get a Hub event
    //return () => Hub.remove('auth', updateUser) // cleanup
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
      <Navbar user={user}/> 
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/account" component={AccountPage} />
          <RouteWithErrorBoundary  path="/class/:class" component={ClassDetail} />
          <RouteWithErrorBoundary  path="/family/:family_id" component={FamilyDetail} />
          <RouteWithErrorBoundary  path="/knownprotein/:knownprotein" component={ProteinNameDetail} />
          <RouteWithErrorBoundary  path="/dna/:dna_id" component={DnaDetail} />
          <RouteWithErrorBoundary  path="/predictedprotein/:protein_id" component={ProteinRecordDetail} />
          <Route exact path="/query" component={QueryFormPage} />
          <Route path="/proteinquery/:query" component={ProteinSearchResults} />
          <Route path="/dnaquery/:query" component={DnaSearchResults} />
          <Route path="/searchresults/:search" component={NavbarSearchResults} />
          <Route path="/tissueexpressionupload">
            <UploadTeData user={user}/>
          </Route>          

          <Route path="/tissueexpression">
            <TeContainer user={user}/>
          </Route>
          
          <Route path="/user-registration" component={SignUpForm}/>
          <Route path="/confirmsignup" component={ConfirmSignUp}/>
          <Route path="/signin" component={SignInForm} />

          <Route path="/documentation" component={Documentation}/>
      
        <Route component={NotFound}/>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
