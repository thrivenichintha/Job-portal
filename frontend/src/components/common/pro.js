import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class Profile extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          email: "",
          usertype:"",
          inst_name:"",
          start:"",
          skills:"",
          rating:"",
          data: {}
        };
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangeemail = this.handleChangeemail.bind(this);
        this.handleChangeusertype = this.handleChangeusertype.bind(this);
        this.handleChangeinst_name = this.handleChangeinst_name.bind(this);
        this.handleChangeskills = this.handleChangeskills.bind(this);
        this.handleChangerating = this.handleChangerating.bind(this);
        this.handleChangestart=this.handleChangestart.bind(this);
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
handleChangeinst_name(event) {
  this.setState({inst_name:event.target.value});
}
handleChangeskills(event) {
  this.setState({skills:event.target.value});
}
handleChangestart(event) {
  this.setState({start:event.target.value});
}
handleChangerating(event) {
  this.setState({rating:event.target.value});
}
handleSubmit(event) {
  console.log("submit");
  event.preventDefault();
  {alert("profile updated")};
  const update_user = {
    email: this.state.email,
    name:this.state.username,
    inst_name:this.state.inst_name,
    usertype:this.state.usertype,
    start:this.state.start,
    skills:this.state.skills,
    rating:this.state.rating,
    date: Date.now()
}
console.log(this.state.start);
axios.post('http://localhost:4000/user/update', update_user)
.then(response => {
  this.setState({ data: response.data });
  this.setState({
    username: this.state.data.name,
    email:this.state.data.email,
    usertype:this.state.data.usertype,
    inst_name:this.state.data.inst_name,
    start:this.state.data.start,
    skills:this.state.data.skills,
    rating:this.state.data.rating

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
              inst_name:this.state.data.inst_name,
              start:this.state.data.start,
              skills:this.state.data.skills,
              rating:this.state.data.rating
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
                  Eduaction:
                </div>
                <div>
                    <label>
                      Institute name:
                      <input type="text" value={this.state.inst_name} onChange={this.handleChangeinst_name}/>
                    </label>
                    <label>
                        start year:
                        <input type="text" value={this.state.start} onChange={this.handleChangestart}/>
                    </label>
                </div>
                <div>
                <label>
                      skills:
                      <input type="text" value={this.state.skills} onChange={this.handleChangeskills}/>
                    </label>
                </div>
                <div>
                    rating:
                    <input type="text" value={this.state.rating} onChange={this.handleChangerating}/>
                </div>
                <div>
                <p>
                <input type="submit" value="submit" className="btn btn-primary" />
                </p>
                </div>

            </form>
            <nav>
                <Link to="/dashboard" className="navbar-brand">DashBoard</Link>
            </nav>
            </div>
          );
        }
    }
