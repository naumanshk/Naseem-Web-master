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
import Header from '../Images/teacher-profile.png'
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import profile_user from '../Images/profile-user.png'
import email from '../Images/email.png'
import gender from '../Images/gender1.png'
import degree from '../Images/policy.png'
import location from '../Images/maps.png'
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
            schooldRef: '',
            editable:false,
            err:false

        }
    }

    componentWillMount() {


        this.getProfile();



    }


    getProfile() {
        let { teacher } = this.state;
        teacher = []
        firebase.database().ref("Teachers").once("value").then(snapshot => {
            snapshot.forEach(school => {


                school.forEach(teachers => {

                    if (teachers.key == localStorage.getItem("teacherId")) {
                        console.log(teachers.val())
                        teacher.push(teachers.val())
                        this.setState({ address: teachers.val().address, name: teachers.val().userName, email: teachers.val().email, gender: teachers.val().gendar, fname: teachers.val().fatherName, schooldRef: teachers.val().refId })


                    }
                })
            })
            this.setState({ teacher })
        })
    }

    editProfile() {

   

        if (this.state.name == "" || this.state.fname == "" || this.state.gender == "" || this.state.schooldRef == "" || this.state.email == "" || this.state.address == "") {

            this.setState({ err: true })

        }
        else {
            firebase.database().ref("Teachers").child(localStorage.getItem("schoolId")).child(localStorage.getItem("teacherId")).update({



                userName: this.state.name,
                fatherName: this.state.fname,
                refId: this.state.schooldRef,
                gendar: this.state.gender,
                email: this.state.email,
                address: this.state.address,
             
            }).then(window.location.reload())
        }
    }

    render() {
        return (
            <div style={{marginRight:'0px'}} className="dashboard-principal">

                <div className="container">
                    <div class='relative ' style={{ marginRight: '10px' }}>

                      
                        <img src={Header} className="header-img border-rad-img"></img>

                    </div>

                    <div className='container flex justify-center'>


                        {/* list of classes */}
                        <div className="section-container-p width-40 width-100" >

                           
                            <h2  class='center green relative' >Profile
                                
                                </h2>
                                <div style={{justifyContent:'flex-end'}} className='flex'>
                               {!this.state.editable ?
                                <Button
                                style={{justifyContent:'flex-end',border:'1px solid #4CBB17', color:'#4CBB17'}}
                                    variant="outlined" size="medium" color="primary"
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
                                    onClick={e=>this.setState({editable:false,err:false})}
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

                                    <InputLabel htmlFor="input-with-icon-adornment">School Reference</InputLabel>
                                    <Input

                                        style={{ width: '100%' }}
                                        value={this.state.schooldRef}
                                        disabled={!this.state.editable ? true : false}
                                        onChange={(e)=> {
                                            e.preventDefault()                                
                                            this.setState({schooldRef:e.target.value})
                                        }}
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <img src={degree} style={{ backgroundColor: 'unset' }} className="icon-input-form" ></img>

                                            </InputAdornment>
                                        }
                                    />

                                </div>


                                <div class='width-80 margin-auto margin-bottom-10'>
                                    {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

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

                                </div>
                                <div class='width-80 margin-auto margin-bottom-10'>
                                    {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

                                   {this.state.editable && <button onClick={e=>this.editProfile()} style={{ cursor:'pointer', background: '#4CBB17', border: 'none', borderRadius: '12px', color: 'white', width: '30%', padding: '20px', font: "14px", fontWeight: 'bold' }} className='flex justify-center center'>Save</button>}

                                </div>









                            </div>
                        </div>
                    </div>
                </div></div>



        )
    }
}

export default profile;