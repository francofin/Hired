import React from 'react';
import ReactDOM from 'react-dom';
import {AuthProvider} from './utils/authContext';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';


const middleWares = [reduxPromise, reduxThunk]
const theStore = applyMiddleware(...middleWares)(createStore)(rootReducer);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={theStore}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
