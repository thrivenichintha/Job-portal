import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/Users/UsersList'
import Home from './components/Common/Home'
import Register from './components/Common/Register'
import Navbar from './components/templates/Navbar'
import Profile from './components/Common/pro'
import Login from './components/Common/login'
import Profile_app from './components/Common/prof_app'
import Recruiter_app from './components/Common/prof_rec'
import DashBoard from './components/Common/dash_app'
import Profile_recruiter from './components/Common/profile_rec'
import DashBoard_recruiter from './components/Common/dash_rec'
import Post_job from './components/Common/post_job'
import edit_post from './components/Common/edit_post'
import apply from './components/Common/apply'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/users" exact component={UsersList}/>
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile_app" component={Profile_app}/>
        <Route path="/dashboard" component={DashBoard}/>
        <Route path="/recruiter_app" component={Recruiter_app}/>
        <Route path="/profile_rec" component={Profile_recruiter}/>
        <Route path="/dashboard_rec" component={DashBoard_recruiter}/>
        <Route path="/post_job" component={Post_job}/>
        <Route path="/edit_post" component={edit_post}/>
        <Route path="/apply" component={apply}/>
        
      </div>
    </Router>
  );
}

export default App;
