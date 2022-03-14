import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./scss/style.default.scss";
import React, {useContext} from "react";
import { AuthContext } from './utils/authContext';
import SSRProvider from "react-bootstrap/SSRProvider";
import { setContext } from "@apollo/client/link/context";
import {SvgIcons, Footer, PrivateRoute} from './components';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import {Arwes,SoundsProvider,ThemeProvider,createSounds,createTheme} from "arwes";
import {ApolloClient, InMemoryCache, ApolloProvider,useQuery,gql, concat, ApolloLink, HttpLink } from "@apollo/client";
import {SignUp, Login, Home, Internships, UserProfile, CompleteSignUp, UserAccount, PersonalInfo, UpdateSecurity, CreateJob, ForgotPassword} from "./pages";



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
            <Route exact path ="/completeregistration" component = {CompleteSignUp} />
            <PrivateRoute exact path ="/profile" component = {UserProfile} />
            <PrivateRoute exact path ="/account-detail" component={UserAccount} />
            <PrivateRoute exact path ="/personal-info" component={PersonalInfo} />
            <PrivateRoute exact path ="/user-security" component={UpdateSecurity} />
            <PrivateRoute exact path ="/add-job-posting" component={CreateJob} />
          </>
        <Footer />
        <SvgIcons />
    </ApolloProvider>
  );
}

export default App;
