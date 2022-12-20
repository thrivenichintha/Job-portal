import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class apply extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            sop:'',
            _id:'',
        };

        const _id=localStorage.getItem("_id");
        this.setState({_id});
        console.log("jobid");
        console.log(this.state._id);

        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangesop = this.onChangesop.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    }
    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }

    onChangesop(event) {
        this.setState({ sop: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.sop);

        const User = {

            email: this.state.email,
            sop:this.state.sop,
            _id:this.state._id,
            date: Date.now()
        }
        axios.post('http://localhost:4000/sop/apply', User)
            .then(res => {alert("applied\t" + res.data.email);console.log(res.data)

            localStorage.setItem("email",User.email);
            this.props.history.push("dashboard");
            //localStorage.setItem("Usertype",User.usertype);

            console.log(User.email);
            //console.log(User.usertype);
        });
                 
        this.setState({
            email: '',
            sop:'',
            date:null
        });
      
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>statement of purpose: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.sop}
                               onChange={this.onChangesop}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="apply" className="btn btn-primary"/>
                    </div>
                    </form>
            </div>
        )
    }
}