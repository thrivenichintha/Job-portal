import React, { Component } from "react";
import axios from "axios";

export default class edit_post extends Component{
    constructor(props) {
        super(props);
    
    this.state = {
        _id:'',
        application_no:'',
        deadline:'',
        position_no:'',
        data: {}
        };
        this.handleChangeapplication_no = this.handleChangeapplication_no.bind(this);
        this.handleChangeposition_no = this.handleChangeposition_no.bind(this);
        this.handleChangedeadline = this.handleChangedeadline.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeapplication_no(event) {
        this.setState({ application_no: event.target.value });
    }
    handleChangeposition_no(event) {
        this.setState({ position_no: event.target.value });
    }
    handleChangedeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    handleSubmit(event) {
        console.log("submit");
        event.preventDefault();
        {alert("updated")};
        
        const update_job = {
            application_no:this.state.application_no,
            position_no:this.state.position_no,
            deadline:this.state.deadline,
            _id:this.state._id,
        }
        console.log(update_job);
        axios.post('http://localhost:4000/job/edit', update_job)
.then(response => {
  this.setState({ data: response.data });
  this.setState({
    application_no:this.state.data.application_no,
    position_no:this.state.data.position_no,
    deadline:this.state.data.deadline,
    

  });
  //console.log(response);
})
.catch(function(error) {
  console.log(error);
});



    }
    componentDidMount() {
        const newJob = {
          _id: localStorage.getItem("id"),
        };
        console.log("id");
        console.log(newJob._id);
        this.setState({ _id: newJob._id });
        axios
          .post("http://localhost:4000/job/find_one", newJob)
          .then(response => {
            this.setState({ data: response.data });
            this.setState({
              application_no:this.state.data.application_no,
              position_no:this.state.data.position_no,
              deadline:this.state.data.deadline
            });
            console.log(this.state.application_no);
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
                    maximum number of applicants:
                    <input type="text" value={this.state.application_no} onChange={this.handleChangeapplication_no} />

                </label>
                </div>
                <div>
                <label>
                    maximum number of positions:
                    <input type="text" value={this.state.position_no} onChange={this.handleChangeposition_no}/>
                </label>
                </div>
                    <div>
                    <label>
                        Deadline:
                        <input type="text" value={this.state.deadline} onChange={this.handleChangedeadline}/>
                    </label>
                </div>
                <div>
                <p>
                <input type="submit" value="submit" className="btn btn-primary" />
                </p>
                </div>

            </form>
            </div>
          );
        }
    }