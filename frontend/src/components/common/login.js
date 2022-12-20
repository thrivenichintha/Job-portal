import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            usertype:'',
            date:null
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsertype= this.onChangeUsertype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
  

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value });
    }


    onSubmit(e) {
        e.preventDefault();

        const User = {

            email: this.state.email,
            password: this.state.password,
            usertype:this.state.usertype,
            date: Date.now()
        }
        axios.post('http://localhost:4000/user/login', User)
            .then(res => {alert("logged in\t" + res.data.email);console.log(res.data)
            localStorage.setItem("email",User.email);
            localStorage.setItem("Usertype",User.usertype);

            console.log(User.email);
            console.log(User.usertype);
            if(User.usertype=="applicant"){
                //console.log(User.usertype);
                this.props.history.push("profile_app");

            }
            else{
                this.props.history.push("recruiter_app");
            }
            })
             ;
             
        this.setState({
            email: '',
            password: '',
            usertype:'',
            date:null
        });
      
    }

    

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div class="form-group">
                    <label for="usertype">usertype:</label>
                     <select class="form-control" id="usertype" value={this.state.usertype} onChange={this.onChangeUsertype}>
                    <option>usertype</option>
                     <option>applicant</option>
                    <option>recruiter</option>
                    </select>

                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                   
                </form>
                <nav>
                <Link to="/register" className="navbar-brand"> not registered,register here</Link>
            </nav>
     
            </div>
            
        )
    
    }
}