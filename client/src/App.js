import React from "react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./scss/style.default.scss";
import {SvgIcons, Footer} from './components';
import SSRProvider from "react-bootstrap/SSRProvider";
import {SignUp, Login, Home, Internships, UserProfile} from "./pages";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import {Arwes,SoundsProvider,ThemeProvider,createSounds,createTheme} from "arwes";
import {ApolloClient, InMemoryCache, ApolloProvider,useQuery,gql} from "@apollo/client";



const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
});



function App() {
  return (
    <ApolloProvider client={client}>
          <>
            <Route exact path ="/" component = {Home} />
            <Route exact path ="/profile" component = {UserProfile} />
            <Route exact path ="/intern" component = {Internships} />
            <Route exact path ="/login" component = {Login} />
            <Route exact path ="/signup" component = {SignUp} />
          </>
        <Footer />
        <SvgIcons />
    </ApolloProvider>
  );
}

export default App;
