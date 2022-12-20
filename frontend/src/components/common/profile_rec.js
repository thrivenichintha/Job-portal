import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


export default class Profile_recruiter extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          email: "",
          usertype:"",
          phn_numb:"",
          bio:"",
          data: {}
        };
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangeemail = this.handleChangeemail.bind(this);
        this.handleChangeusertype = this.handleChangeusertype.bind(this);
        this.handleChangephn_numb = this.handleChangephn_numb.bind(this);
        this.handleChangebio = this.handleChangebio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }

handleChangename(event) {
        this.setState({username: event.target.value});
}
handleChangeemail(event) {
        this.setState({email:event.target.value});
    }
handleChangeusertype(event) {
        this.setState({usertype:event.target.value});
}
handleChangephn_numb(event) {
  this.setState({phn_numb:event.target.value});
}
handleChangebio(event) {
  this.setState({bio:event.target.value});
}
handleSubmit(event) {
  console.log("submit");
  event.preventDefault();
  
  const update_user = {
    email: this.state.email,
    name:this.state.username,
    usertype:this.state.usertype,
    phn_numb:this.state.phn_numb,
    bio:this.state.bio,
    date: Date.now()
  }
console.log(this.state.phn_numb);
axios.post('http://localhost:4000/user/update', update_user)
.then(response => {
console.log("backend");
  this.setState({ data: response.data });
  this.setState({
    username: this.state.data.name,
    email:this.state.data.email,
    usertype:this.state.data.usertype,
    phn_numb:this.state.data.phn_numb,
    bio:this.state.data.bio,
    
  });

  //console.log(response);
})
.catch(function(error) {
  console.log(error);
});
 
}
      componentDidMount() {
        const newUser = {
          email: localStorage.getItem("email"),
        };
        this.setState({ email: newUser.email });
        axios
          .post("http://localhost:4000/user/profile", newUser)
          .then(response => {
            this.setState({ data: response.data });
            this.setState({
              username: this.state.data.name,
              email:this.state.data.email,
              usertype:this.state.data.usertype,
              phn_numb:this.state.data.phn_numb,
              bio:this.state.data.bio
            });
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <div>
                <label>
                    name:
                    <input type="text" value={this.state.username} onChange={this.handleChangename} />

                </label>
                </div>
                <div>
                <label>
                    email:
                    <input type="text" value={this.state.email} onChange={this.handleChangeemail}/>
                </label>
                </div>
                    <div>
                    <label>
                        usertype:
                        <input type="text" value={this.state.usertype} onChange={this.handleChangeusertype}/>
                    </label>
                </div>
                <div>
                    contact number:
                    <input type="text" value={this.state.phn_numb} onChange={this.handleChangephn_numb}/>
                </div>
                <div>
                    Bio:
                    <input type="text" value={this.state.bio} onChange={this.handleChangebio}/>
                </div>
                <div>
                <p>
                <input type="submit" value="submit" />
                </p>
                </div>

                <Link to="/dashboard_rec" className="nav-link">DashBoard</Link>

            </form>
            </div>
          );
        }
    }