import React, { Component } from 'react';
// import './AppEx.css';
import '../config';
import * as firebase from 'firebase'
import studentimg from '../ImagesEx/employee@2x.png'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController, toISODateString } from 'react-dates';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import 'react-dates/lib/css/_datepicker.css';
import greenhex from '../ImagesEx/greenhex.png'
import bluehex from '../ImagesEx/bluehex.png'
import yellowhex from '../ImagesEx/yellowhex.png'
import commentimg from '../ImagesEx/comment.png'
import Progress from 'react-progressbar';
import path from '../ImagePrinci/Path 2.png'
import path1 from '../ImagePrinci/Group 66.png'
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Header from '../Images/green.png'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import profile_user from '../Images/user.png'
import email from '../Images/msg.png'
import gender from '../Images/gender.png'
import degree from '../Images/qualification.png'
import location from '../Images/location.png'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';

import Icon from '@material-ui/core/Icon';


class profile extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            address: '',
            email: '',
            gender: '',
            fname: '',
            contact: '',
            editable:false,
            err:false,
            students:[]

        }
    }

    componentWillMount() {


        this.getProfile();



    }


    getProfile() {
  
         firebase.database().ref("Student").once("value").then(snapshot => {
            let { students } = this.state;
            students = []
            snapshot.forEach(section => {
                if (section.key == localStorage.getItem("classId")) {
                    section.forEach(student => {
                        if(student.key==localStorage.getItem("studentId")){
                        students.push(student.val())
                        this.setState({name:student.val().userName,fname:student.val().father_name,gender:student.val().gender,email:student.val().email,contact:student.val().father_pno})
                        }
                    })
                }
            })
            this.setState({ students })

           
        })
    }

    editProfile() {

   

        if (this.state.name == "" || this.state.fname == "" || this.state.gender == "" || this.state.contact == "" || this.state.email == "" ){

            this.setState({ err: true})

        }
        else {
            firebase.database().ref("Student").child(localStorage.getItem("classId")).child(localStorage.getItem("studentId")).update({



                userName: this.state.name,
                father_name: this.state.fname,
                father_pno: this.state.contact,
                gender: this.state.gender,
                email: this.state.email,
              
             
            }).then(window.location.reload())
        }
    }

    render() {
        return (
            <div className="dashboard-principal">

                <div className="container">
                    <div class='relative ' style={{ marginRight: '10px' }}>

                        <h1 className="center header-main-p">Welcome To Your Dashboard</h1>
                        <img src={Header} className="header-img-p "></img>

                    </div>

                    <div className='container flex justify-center'>


                        {/* list of classes */}
                        <div className="section-container-p width-40 width-100" >

                           
                            <h2 style={{color:"#18502F"}} class='center  relative' >Profile
                                
                                </h2>
                                <div style={{justifyContent:'flex-end'}} className='flex'>
                               {!this.state.editable ?
                                <Button
                                    style={{justifyContent:'flex-end',border:'1px solid rgb(24, 80, 47)', color:'rgb(24, 80, 47)'}}
                                    variant="outlined" size="medium" color="green"
                                    startIcon={<EditIcon />}
                                    onClick={e=>this.setState({editable:true})}
                                >
                                    Edit Profile
                                </Button>  
                                
                                :

                                <Button
                                    style={{justifyContent:'flex-end'}}
                                    variant="outlined" size="medium" color="secondary"
                                    startIcon={<CancelIcon />}
                                    onClick={e=>this.setState({editable:false})}
                                >
                                    Cancel
                                </Button>  
    }  
                            </div>



                            <hr></hr>

                            <div style={{ paddingTop: '40px', paddingBottom: '40px',height: 'auto' }} className="inventory-values">



                                <div class='width-80 margin-auto margin-bottom-10'>
                                    {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>}

                                    <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
                                    <Input
                                        value={this.state.name}
                                        style={{ width: '100%' }}
                                        disabled={!this.state.editable ? true : false}
                                        id="input-with-icon-adornment"
                                        onChange={(e)=> {
                                            e.preventDefault()                                
                                            this.setState({name:e.target.value})
                                        }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={profile_user} style={{ backgroundColor: 'unset' }} className="icon-input-form" ></img>

                                            </InputAdornment>
                                        }
                                    />

                                </div>

                                <div class='width-80 margin-auto margin-bottom-10'>
                                    {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

                                    <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                                    <Input
                                        value={this.state.email}
                                        disabled={!this.state.editable ? true : false}

                                        style={{ width: '100%' }}
                                        onChange={(e)=> {
                                            e.preventDefault()                                
                                            this.setState({email:e.target.value})
                                        }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={email} style={{ backgroundColor: 'unset' }} className="icon-input-form" ></img>

                                            </InputAdornment>
                                        }
                                    />

                                </div>

                                <div class='width-80 margin-auto margin-bottom-10'>
                                    {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

                                    <InputLabel htmlFor="input-with-icon-adornment">Gender</InputLabel>
                                    <Input
                                        value={this.state.gender}
                                        disabled={!this.state.editable ? true : false}

                                        style={{ width: '100%' }}
                                        onChange={(e)=> {
                                            e.preventDefault()                                
                                            this.setState({gender:e.target.value})
                                        }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={gender} style={{ backgroundColor: 'unset' }} className="icon-input-form" ></img>

                                            </InputAdornment>
                                        }
                                    />

                                </div>

                                <div class='width-80 margin-auto margin-bottom-10'>
                                    {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

                                    <InputLabel htmlFor="input-with-icon-adornment">Father Name</InputLabel>
                                    <Input
                                        value={this.state.fname}
                                        disabled={!this.state.editable ? true : false}

                                        style={{ width: '100%' }}
                                        onChange={(e)=> {
                                            e.preventDefault()                                
                                            this.setState({fname:e.target.value})
                                        }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={profile_user} style={{ backgroundColor: 'unset' }} className="icon-input-form" ></img>

                                            </InputAdornment>
                                        }
                                    />

                                </div>

                                <div class='width-80 margin-auto margin-bottom-10'>
                                    {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

                                    <InputLabel htmlFor="input-with-icon-adornment">Contact</InputLabel>
                                    <Input

                                        style={{ width: '100%' }}
                                        value={this.state.contact}
                                        disabled={!this.state.editable ? true : false}
                                        onChange={(e)=> {
                                            e.preventDefault()                                
                                            this.setState({contact:e.target.value})
                                        }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={degree} style={{ backgroundColor: 'unset' }} className="icon-input-form" ></img>

                                            </InputAdornment>
                                        }
                                    />

                                </div>


                                {/* <div class='width-80 margin-auto margin-bottom-10'>
                                    

                                    <InputLabel htmlFor="input-with-icon-adornment">Address</InputLabel>
                                    <Input
                                        value={this.state.address}
                                        style={{ width: '100%' }}
                                        disabled={!this.state.editable ? true : false}
                                        onChange={(e)=> {
                                            e.preventDefault()                                
                                            this.setState({address:e.target.value})
                                        }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={location} style={{ backgroundColor: 'unset' }} className="icon-input-form" ></img>

                                            </InputAdornment>
                                        }
                                    />

                                </div> */}
                                <div class='width-80 margin-auto margin-bottom-10'>
                                 

                                   {this.state.editable && <button onClick={e=>this.editProfile()} style={{ cursor:'pointer', background: '#18502F', border: 'none', borderRadius: '12px', color: 'white', width: '30%', padding: '20px', font: "14px", fontWeight: 'bold' }} className='flex justify-center center'>Save</button>}

                                </div>









                            </div>
                        </div>
                    </div>
                </div></div>



        )
    }
}

export default profile;