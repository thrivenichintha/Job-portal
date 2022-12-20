import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import axios from 'axios';

export default class DashBoard_recruiter extends Component {
    
    constructor(props) {
        super(props);
        this.state = {jobs: [],sortedjobs: [], sortName:true};
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:4000/job')
             .then(response => {
                 this.setState({jobs: response.data, sortedjobss:response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }
    sortChange(){
        /**
         *      Note that this is sorting only at front-end.
         */
                var array = this.state.jobs;
                var flag = this.state.sortName;
                array.sort(function(a, b) {
                    if(a.date != undefined && b.date != undefined){
                        return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
                    }
                    else{
                        return 1;
                    }
                  });
                this.setState({
                    jobs:array,
                    sortName:!this.state.sortName,
                })
    }
            renderIcon(){
                if(this.state.sortName){
                    return(
                        <ArrowDownwardIcon/>
                    )
                }
                else{
                    return(
                        <ArrowUpwardIcon/>
                    )            
                }
            }

    render() {
        return (
            <div>
                <Paper>
                     <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Number of applicants</TableCell>
                                            <TableCell>number of positions</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.date}</TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.application_no}</TableCell>
                                            <TableCell>{job.position_no}</TableCell>
                                            <TableCell><button onClick={()=>{
                                            localStorage.removeItem("id");
                                            localStorage.setItem("id",job._id);
                                            this.props.history.push("edit_post");}
                                            }>edit</button>
                                            </TableCell>
                                            <TableCell>
                                                <button onClick={()=>{
                                                    const delete_job={
                                                        _id:job._id,
                                                    };
                                                    console.log(delete_job._id);
                                                    this.setState({_id:delete_job._id});
                                                    axios
                                                        .post("http://localhost:4000/job/delete_one", delete_job)
                                                        .then(response => {
                                                            console.log("deleted")
                                                            this.setState({ data: response.data });
                                                        })
                                                        .catch(function(error) {
                                                            console.log(error);
                                                          });
                                                        }   
                                                }>delete</button>
                                            </TableCell>
                                            
                                            
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    <Link to="/post_job" className="nav-link">Post job</Link>
                    <Link to="/profile_rec" className="nav-link">Profile</Link>
           </div>
        )
    }
}

