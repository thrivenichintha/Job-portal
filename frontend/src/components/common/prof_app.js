import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"


export default class Profile_app extends Component{
    constructor(props) {
        super(props);
    }
    render(){
    return(
       <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/profile" className="navbar-brand">profile</Link>
            <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/dashboard" className="nav-link">DashBoard</Link>
                            </li>                          
                        </ul>
                    </div>
            </nav>
       </div>

  );
    }
}
