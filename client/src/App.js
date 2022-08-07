import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./scss/style.default.scss";
import React, {useContext} from "react";
import { AuthContext } from './utils/authContext';
import SSRProvider from "react-bootstrap/SSRProvider";
import {SvgIcons, Footer, PrivateRoute, FormProvider, ProfileProvider} from './components';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import {Arwes,SoundsProvider,ThemeProvider,createSounds,createTheme} from "arwes";
import {ApolloClient, InMemoryCache, ApolloProvider, concat, ApolloLink, HttpLink } from "@apollo/client";
import {SignUp, Login, Home, Internships, UserProfile, CompleteSignUp, UserAccount, PersonalInfo,
       UpdateSecurity, UpdateProfile, CreateJob, ForgotPassword, BasicInfo, SecondaryInfo, TertiaryInfo, UserListing, UserMessages, PhotoUpload, CompleteUpdate} from "./pages";





function App() {

  const {state} = useContext(AuthContext);
  const {user} = state;
  console.log("client user", user)

  const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT });

  const authLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authtoken: user ? user.token : "",
      }
    }));
  
    return forward(operation);
  })


  const client = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
   
  });

  return (
    <ApolloProvider client={client}>
          <>
            <Route exact path ="/" component = {Home} />
            <Route exact path ="/intern" component = {Internships} />
            <Route exact path ="/login" component = {Login} />
            <Route exact path ="/signup" component = {SignUp} />
            <Route exact path ="/password-reset" component = {ForgotPassword} />
            <Route exact path ="/all-users" component = {UserListing} />
            <Route exact path ="/completeregistration" component = {CompleteSignUp} />
            <ProfileProvider>
            <Switch>
            <PrivateRoute exact path ="/profile" component = {UserProfile} />
            <PrivateRoute exact path ="/account-detail" component={UserAccount} />
            <PrivateRoute exact path ="/personal-info" component={PersonalInfo} />
            <PrivateRoute exact path ="/user-security" component={UpdateSecurity} />
            <PrivateRoute exact path ="/add-job-posting" component={CreateJob} />
            <PrivateRoute exact path ="/update-profile-detail" component={UpdateProfile} />
            <PrivateRoute exact path ="/basic-info" component={BasicInfo} />
            <PrivateRoute exact path ="/personal-details" component={SecondaryInfo} />
            <PrivateRoute exact path ="/education-details" component={TertiaryInfo} />
            <PrivateRoute exact path ="/upload-photos" component={PhotoUpload} />
            <PrivateRoute exact path ="/user-messages" component={UserMessages} />
            <PrivateRoute exact path ="/complete-profile" component={CompleteUpdate} />
            </Switch>
            </ProfileProvider>
          </>
        <Footer />
        <SvgIcons />
    </ApolloProvider>
  );
}

export default App;
