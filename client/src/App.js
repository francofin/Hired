import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./scss/style.default.scss";
import React, {useContext} from "react";
import {SvgIcons, Footer} from './components';
import { AuthContext } from './utils/authContext';
import SSRProvider from "react-bootstrap/SSRProvider";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import {Arwes,SoundsProvider,ThemeProvider,createSounds,createTheme} from "arwes";
import {SignUp, Login, Home, Internships, UserProfile, CompleteSignUp} from "./pages";
import {ApolloClient, InMemoryCache, ApolloProvider,useQuery,gql, concat, ApolloLink, HttpLink } from "@apollo/client";



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
        authorization: user ? user.token : "",
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
            <Route exact path ="/profile" component = {UserProfile} />
            <Route exact path ="/intern" component = {Internships} />
            <Route exact path ="/login" component = {Login} />
            <Route exact path ="/signup" component = {SignUp} />
            <Route exact path ="/completeregistration" component = {CompleteSignUp} />
          </>
        <Footer />
        <SvgIcons />
    </ApolloProvider>
  );
}

export default App;
