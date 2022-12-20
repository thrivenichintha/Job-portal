import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            users: {},sortName:true,
            email:'',
            password:'',
            value:'',
            institue_name:'',
            skills:''
            
        };
        this.handleChangename = this.handleChangename.bind(this);
        this.handleChangeemail = this.handleChangeemail.bind(this);
        this.handleChangeinst = this.handleChangeinst.bind(this);
        this.handleChangeskills = this.handleChangeskills.bind(this);
        this.handleChangerating = this.handleChangerating.bind(this);


        this.handleChangestart_year=this.handleChangestart_year.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sortClicked = this.sortClicked.bind(this);
        this.renderIcon = this.renderIcon.bind(this);
        this.sortChange = this.sortChange.bind(this);
        
    }
    handleChangename(event) {
            this.setState({value: event.target.value});
    }
    handleChangeemail(event) {
            this.setState({email:event.target.email});
        }
    handleChangeinst(event) {
            this.setState({institue_name:event.target.institue_name});
    }
    handleChangeskills(event) {
            this.setState({skills:event.target.skills});
    }
    handleChangestart_year(event) {
        this.setState({start_year:event.target.start_year});
}
handleChangerating(event) {
    this.setState({rating:event.target.rating});
}

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
    componentDidMount() {
        axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({users: response.data});
                 const email=localStorage.getItem("email");
                 const usertype=localStorage.getItem("Usertype");
                 this.setState({email});
                 this.setState({usertype});
                 console.log(this.state.email);
                 console.log(this.state.usertype);                 
             })
             .catch(function(error) {
                 console.log(error);
             })        
    }
    componentDidUpdate() {
        axios.get('http://localhost:4000/user')
             .then(response => {
                 this.setState({users: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })        
    }

    sortClicked(){
        console.log(this.state);
    }

    sortChange(){
        var array = this.state.users;
        var flag = this.state.sortName;
        array.sort(function(a, b) {
            if(a.date != undefined && b.date != undefined){
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            }
            else{
                return 1;
            }
          }); // Sort youngest first
        this.setState({
            users:array,
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
            <form onsubmit={this.handleSubmit}>
                <div>
                <label>
                    username:
                    <input type="text" value={this.state.value}onChange={this.handleChangename} />

                </label>
                </div>
                <div>
                <label>
                    email:
                    <input type="text" value={this.state.email} onChange={this.handleChangeemail}/>
                </label>
                </div>
                <div>
                    <div>education:
                    </div>
                    <label>
                            institute name:
                            <input type="text" value={this.state.institue_name} onChange={this.handleChangeinst}/>
                    </label>
                    <label>
                        start year:
                        <input type="text" value={this.state.start_year} onCahnge={this.handleChangestart_year}/>
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
                <input type="submit" value="submit" />
                </p>
                </div>

            </form>
        )
    }
}

export default Profile;