import "./Spinner.css";
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faSpinner);



class Spinner extends Component{

    render(){
        return(
            
            <div className='row'>
                <div className='col-md-12'>
                    <div className="card text-center">
                        <div className="card-header">
                            Locating Account Information
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">Loading....</h5>
                                <p className="card-text">Attempting to Locate your Account, Redirecting in {this.props.counter}.</p>
                                <Link to="/login" className="btn btn-primary">Login</Link>
                                <div className="spinner-wrapper">
                                    <FontAwesomeIcon icon="spinner" size="6x" spin/>
                                </div>
                            </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Spinner;