import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


export default class Post_job extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title:'',
            name:'',
            email:'',
            application_no:'',
            position_no:'',
            deadline:'',
            req_skills:'',
            jobtype:'',
            duration:'',
            salary:'',
            rating:'',
            date:null
        }

        this.onChangename = this.onChangename.bind(this);
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangeemail= this.onChangeemail.bind(this);
        this.onChangeapplication_no= this.onChangeapplication_no.bind(this);
        this.onChangeposition_no= this.onChangeposition_no.bind(this);
        this.onChangedeadline= this.onChangedeadline.bind(this);
        this.onChangereq_skills= this.onChangereq_skills.bind(this);
        this.onChangejobtype= this.onChangejobtype.bind(this);
        this.onChangeduration= this.onChangeduration.bind(this);
        this.onChangesalary= this.onChangesalary.bind(this);
        this.onChangerating= this.onChangerating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangename(event) {
        this.setState({ name: event.target.value });
    }

    onChangeemail(event) {
        this.setState({ email: event.target.value });
    }

    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }
    onChangeapplication_no(event) {
        this.setState({ application_no: event.target.value });
    }
    onChangeposition_no(event) {
        this.setState({ position_no: event.target.value });
    }
    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    onChangereq_skills(event) {
        this.setState({ req_skills: event.target.value });
    }
    onChangejobtype(event) {
        this.setState({ jobtype: event.target.value });
    }
    onChangeduration(event) {
        this.setState({ duration: event.target.value });
    }
    onChangesalary(event) {
        this.setState({ salary: event.target.value });
    }
    onChangerating(event) {
        this.setState({ rating: event.target.value });
    }


    onSubmit(e) {
        e.preventDefault();
        const newJob = {
            title:this.state.title,
            name: this.state.name,
            email: this.state.email,
            application_no:this.state.application_no,
            position_no:this.state.position_no,
            deadline:this.state.deadline,
            req_skills:this.state.req_skills,
            jobtype:this.state.jobtype,
            duration:this.state.duration,
            salary:this.state.salary,
            rating:this.state.rating,
            date: Date.now()
        }
        console.log(this.state.date);
        axios.post('http://localhost:4000/job/add', newJob)
             .then(res => {alert("posted\t" + res.data.name);console.log(res.data)})
             this.props.history.push("dashboard_rec");
             ;

        this.setState({
            title:'',
            name:'',
            email:'',
            application_no:'',
            position_no:'',
            deadline:'',
            req_skills:'',
            jobtype:'',
            duration:'',
            salary:'',
            rating:'',
            date:null
        });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.title}
                               onChange={this.onChangetitle}
                               />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.email}
                               onChange={this.onChangeemail}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Maximum number of applications: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.application_no}
                               onChange={this.onChangeapplication_no}
                               />
                    </div>
                    <div className="form-group">
                        <label>Maximum number of positions: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.position_no}
                               onChange={this.onChangeposition_no}
                               />
                    </div>
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.deadline}
                               onChange={this.onChangedeadline}
                               />  
                    </div>
                    <div className="form-group">
                        <label>required skills: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.req_skills}
                               onChange={this.onChangereq_skills}
                               />
                    </div>
                    <div className="form-group">
                        <label>Job type: </label>
                       <select class="form control" id="jobtype"
                               value={this.state.jobtype}
                               onChange={this.onChangejobtype}>
                                   <option>jobtype</option>
                                   <option>full-time</option>
                                   <option>part-time</option>
                                   <option>work from home</option>
                                   </select>

                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.duration}
                               onChange={this.onChangeduration}
                               />
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.salary}
                               onChange={this.onChangesalary}
                               />
                    </div>
                    <div className="form-group">
                        <label>Rating: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.rating}
                               onChange={this.onChangerating}
                               />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Post job" className="btn btn-primary"/>
                    </div>
                </form>
                <Link to="/dashboard_rec" className="nav-link">DashBoard</Link>
            </div>
        )
    }
}