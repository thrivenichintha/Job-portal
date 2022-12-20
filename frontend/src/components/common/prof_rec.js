import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"


export default class Recruiter_app extends Component{
    constructor(props) {
        super(props);
    }
    render(){
    return(
       <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/profile_rec" className="navbar-brand">profile</Link>
            <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/dashboard_rec" className="nav-link">DashBoard</Link>
                            </li>                          
                        </ul>
                    </div>
            </nav>
       </div>

  );
    }
}