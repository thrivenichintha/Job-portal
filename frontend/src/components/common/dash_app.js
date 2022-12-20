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
        this.state= {
            search:'',
            min:'',
            max:'',
            duration:'',
            jobtype:'',
            applied:'',

        }
        this.state = {jobs: [],sortedjobs: [], sortName:true, sortSalary:true,sortDuration:true,sortRating:true};
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        this.sortSalary= this.sortSalary.bind(this);
        this.renderSalary=this.renderSalary.bind(this);
        this.sortDuration= this.sortDuration.bind(this);
        this.sortRating= this.sortRating.bind(this);
        this.renderRating = this.renderRating.bind(this);
        this.renderDuration = this.renderDuration.bind(this);
        this.handleChangesearch = this.handleChangesearch.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onChangemax=this.onChangemax.bind(this);
        this.onChangemin=this.onChangemin.bind(this);
        //this.onSubmit=this.onSubmit.bind(this);
        this.handlefilterSalary=this.handlefilterSalary.bind(this);
        this.onChangeduration=this.onChangeduration.bind(this);
        this.handlefilterduration=this.handlefilterduration.bind(this);
        this.onChangejobtype=this.onChangejobtype.bind(this);
        this.handlefilterjobtype=this.handlefilterjobtype.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:4000/job')
             .then(response => {
                 this.setState({jobs: response.data, sortedjobs:response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    handleChangesearch(event) {
        //console.log("handle");
        this.setState({ search: event.target.value });
        //console.log(this.state.search);
    }
    handleSubmit(event) {
        console.log("search");
        console.log(this.state.search);
        var arr=this.state.jobs;
        var result=arr.filter(arr => arr.title.includes(this.state.search));
        console.log(arr);
        console.log(this.state.search);
        this.setState({
            jobs:result,
        })
    }
    onChangemax(event){
        this.setState({max:event.target.value});
    }
    onChangemin(event){
        this.setState({min:event.target.value});
    }
    onChangeduration(event){
        this.setState({duration:event.target.value});
    }
    onChangejobtype(event){
        this.setState({jobtype:event.target.value});
    }
    handlefilterSalary(event){

        console.log("salary");
        console.log(this.state.min);
        console.log(this.state.max);
        var arr=this.state.jobs;
        var result=arr.filter(arr=>arr.salary<parseInt(this.state.max));
        var result2=result.filter(result=>result.salary>parseInt(this.state.min));
        console.log(result);
        console.log(result2);
        this.setState({
            jobs:result2,
        })

    }
    handlefilterduration(event){
        console.log("duration");
        var arr=this.state.jobs;
        var result=arr.filter(arr=>arr.duration < parseInt(this.state.duration));
        console.log(result);
        this.setState({
            jobs:result,
        })
    }
    handlefilterjobtype(event){
        console.log("jobtype");
        var arr=this.state.jobs;
        var result=arr.filter(arr=>arr.jobtype.includes(this.state.jobtype));
        console.log(result);
        this.setState({
            jobs:result,
        })
    }



    sortRating(){
        var array=this.state.jobs;
        var flag=this.state.sortRating;
        array.sort(function(a,b){
            if(parseInt(a.rating)!=undefined && parseInt(b.rating)!=undefined){
                return (1 - flag*2) * (parseInt(a.rating) - parseInt(b.rating));
            }
            else{
                return 1;
            }
        });
        this.setState({
            jobs:array,
            sortRating:!this.state.sortRating,
            
        })
        //console.log(this.state.sortSalary);
    }

    renderRating(){
        if(this.state.sortRating){
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


    sortDuration(){
        var array=this.state.jobs;
        var flag=this.state.sortDuration;
        array.sort(function(a,b){
            if(parseInt(a.duration)!=undefined && parseInt(b.duration)!=undefined){
                return (1 - flag*2) * (parseInt(a.duration) - parseInt(b.duration));
            }
            else{
                return 1;
            }
        });
        this.setState({
            jobs:array,
            sortDuration:!this.state.sortDuration,
            
        })
        //console.log(this.state.sortSalary);
    }

    renderDuration(){
        if(this.state.sortDuration){
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
    sortSalary(){
        var array=this.state.jobs;
        var flag=this.state.sortSalary;
        array.sort(function(a,b){
            if(parseInt(a.salary)!=undefined && parseInt(b.salary)!=undefined){
                return (1 - flag*2) * (parseInt(a.salary) - parseInt(b.salary));
            }
            else{
                return 1;
            }
        });
        this.setState({
            jobs:array,
            sortSalary:!this.state.sortSalary,
            
        })
        console.log(this.state.sortSalary);
    }

    renderSalary(){
        if(this.state.sortSalary){
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
        const { filteredData } = this.state;
        return (
            <div>
                <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                                        <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    
                                    <IconButton onClick={this.handleSubmit}>
                                        <SearchIcon/>
                                    </IconButton>
                                    
                                </InputAdornment>
                               

                            )}}
                            value={this.state.search}
                            onChange={this.handleChangesearch}
                            
                            
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem button>
                            <form noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} onChange={this.onChangemin}/>
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true} onChange={this.onChangemax}/>
                                    <IconButton onClick={this.handlefilterSalary}>
                                        <SearchIcon/>
                                    </IconButton>
                                </form>                                                               
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                               <form>
                                   <label>duration</label>
                                   
                     <select class="form-control" id="duration"  onChange={this.onChangeduration}>
                            <option>duration</option>
                            <option>1</option>
                            <option>2</option>
                             <option>3</option>
                             <option>4</option>
                             <option>5</option>
                             <option>6</option>
                             <option>7</option>
                    </select>
                    <IconButton onClick={this.handlefilterduration}>
                                        <SearchIcon/>
                                    </IconButton>

                               </form>
                            </ListItem>
                            <Divider />
                            <ListItem button divider>
                            <form>
                                   <label>jobtype</label>
                                   
                     <select class="form-control" id="jobtype"  onChange={this.onChangejobtype}>
                            <option>jobtype</option>
                            <option>full-time</option>
                            <option>part-time</option>
                             <option>work from home</option>
                            
                    </select>
                    <IconButton onClick={this.handlefilterjobtype}>
                                        <SearchIcon/>
                                    </IconButton>

                               </form>
                            </ListItem>

                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                            <TableHead>
                                    <TableRow>
                                            <TableCell> <Button onClick={this.sortChange}>{this.renderIcon()}</Button>Date</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>recruiter name</TableCell>
                                            <TableCell><Button onClick={this.sortRating}>{this.renderRating()}</Button>recruiter Rating</TableCell>
                                            <TableCell><Button onClick={this.sortSalary}>{this.renderSalary()}</Button>Salary</TableCell>
                                            <TableCell><Button onClick={this.sortDuration}>{this.renderDuration()}</Button>Duration</TableCell>
                                            <TableCell>Deadline</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map((job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.date}</TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.name}</TableCell>
                                            <TableCell>{job.rating}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>{job.deadline}</TableCell>
                                            <TableCell><button onClick={()=>{
                                            localStorage.removeItem("_id");
                                            localStorage.setItem("_id",job._id);
                                            this.props.history.push("apply");}
                                            }>apply</button>
                                            </TableCell>
                                            
                                            
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
        )
    }
}
