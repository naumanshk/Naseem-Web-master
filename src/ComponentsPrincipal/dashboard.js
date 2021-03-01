import React, { Component } from 'react';
import './principal.css';
import '../config';
import * as firebase from 'firebase'
import Announcements from './announcementsPrincipal'
import principalHeader from '../ImagePrinci/coverP.png'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { isInclusivelyBeforeDay } from 'react-dates'
import * as moment from 'moment';
import teachericon from '../ImagePrinci/teacher-box-icon.png'
import teacherpurpleicon from '../ImagePrinci/teacher-purple-icon.svg'
import Chart from './chart'
import MonthlyChart from './monthlyExpense'
import studentImg from '../ImagePrinci/student-box-icon.png'
import curriculum from '../ImagePrinci/curriculum-box-icon.png'
import feeIcon from '../ImagePrinci/fee-box-icon.png'
import testIcon from '../ImagePrinci/test-box-icon.png'
import classPurpleIcon from '../ImagePrinci/class-purple-icon.svg'

import classIcon from '../ImagePrinci/class-box-icon.png'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

import testImg from '../Images/test.png'
import fire from '../config';
// import announcementImg from '../Images/announcement.png'
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

class dashboardPrincipalComponent extends Component {
    constructor() {
        super()
        this.state = {
            teacher: '',
            teacherId: '',
            classes: [],
            students: [],
            schools: [],
            teachers: [],
            schoolId: '',
            attendance: [],
            date: moment(),
            selectedDate: moment(),
            totalstudent: 0,
            totalclasses: 0,
            totalteachers: 0,
            classId: '',
            Tests: [],
            fee: [],
            announcements: [],
            drawer: false,
            attendanceMarked: true,
            Notifications: [],
            checked: false,

            organization: ""

        }
    }

    componentDidMount() {
        this.getSchools();
        // this.getTotals()
        // this.getOrganization()
    }

    getOrganization() {
        console.log('runiing')
        firebase.database().ref("Organization").once("value").then(snapshot => {
            console.log(snapshot.val())
            snapshot.forEach(organization => {
                if (organization.val().organizationID == localStorage.getItem("user")) {
                    this.setState({ organization: organization.key })

                }
            })

            // this.getSchools();




        })
    }

    async getSchools() {
        let { schools } = this.state;
        schools = []
        await firebase.database().ref("School").once("value").then(snapshot => {
            snapshot.forEach(organization => {
                organization.forEach(school => {
                    // console.log(school.val())
                    if (school.val().refId == localStorage.getItem("user")) {
                        console.log(school.val())
                        schools.push(school.val())
                        this.setState({ schoolId: school.key })

                        localStorage.setItem("schoolId", school.key)

                    }
                })
                // if (organization.key == this.state.organization ){
                //     organization.forEach(item => {
                //         schools.push(item.val())
                //     })
                // }      

            })
            this.setState({ schools })
            // this.getFinances();
            this.getTotals();

        })
    }







    async getTotals() {
        let { totalstudents, totalclasses, totalteachers } = this.state;

        totalstudents = 0;


        var classes = [];
        await firebase.database().ref("Classes").once("value").then(snapshot => {
            this.state.schools.forEach(school => {
                snapshot.forEach(School => {
                    if (School.key == school.id) {
                        School.forEach(section => {
                            classes.push(section.val())

                        })

                    }

                })

            })
            this.setState({ totalclasses: classes.length, classes })
            console.log("total classes" + classes.length)


            firebase.database().ref("Student").once("value").then(snapshot => {
                classes.forEach(Class => {
                    snapshot.forEach(section => {
                        if (section.key == Class.id) {
                            section.forEach(student => {
                                totalstudents = totalstudents + 1;

                            })
                        }

                    })

                })
                this.setState({ totalstudents })
                console.log("total students" + totalstudents)

            })

        })

        totalteachers = 0;
        var teachers = []
        await firebase.database().ref("Teachers").once("value").then(snapshot => {
            this.state.schools.forEach(school => {
                snapshot.forEach(School => {
                    if (School.key == school.id) {
                        School.forEach(teacher => {
                            totalteachers = totalteachers + 1;
                            teachers.push(teacher.val())
                        })

                    }

                })

            })
            this.setState({ totalteachers, teachers })
            console.log("total teachers" + totalteachers)

        })


    }



    render() {
        let attendance = this.state.attendance;

        return (
            <div className="dashboard-principal">
                <div className="menu-icon-right" onClick={() => { this.setState({ drawer: true }) }}><MenuIcon /></div>
                <div className="container">
                    <div class='relative ' style={{ marginRight: '10px' }}>

                        {/* <h1 className="center header-main-p">Welcome To Your Dashboard</h1> */}
                        <img src={principalHeader} className="header-img-p "></img>
                        {/* <div style={{ height: '98%', width: '100%' }} class='gradiant-p absolute no-margin'></div> */}
                    </div>

                    <Container>
                        <Grid container className="justify-center">
                            <Grid md={12} xs={12} lg={6}>
                                <h2 className="regular purple center">Fees Analysis</h2>
                                <div className="mychart-p">
                                    <Chart />

                                </div>
                            </Grid>

                            <Grid md={12} xs={12} lg={6}>
                                <h2 className="regular purple center">Expense Analysis</h2>
                                <div className="mychart-p">
                                    <MonthlyChart />

                                </div>
                            </Grid>

                        </Grid>



                    </Container>


                    <div style={{ marginTop: '40px' }} className="justify-center flex flex-responsive padding-sides-20 margin-bottom-10 width-100 margin-auto" >


                        <div className="class-box-purple" >
                            <img src={teachericon} className="class-icon-p" />
                            <h2 style={{ marginBottom: 0, textAlign: 'center' }} className="regular">Teacher {this.state.totalteachers}</h2>
                            <p style={{ margin: 0 }} className="regular"></p>


                        </div>

                        <div className="class-box-purple" >
                            <img src={classIcon} className="class-icon-p" />
                            <h2 style={{ marginBottom: 0, textAlign: 'center' }} className="regular">Classes {this.state.totalclasses}</h2>
                            <p style={{ margin: 0 }} className="regular"></p>


                        </div>


                        {/* <div className="class-box-purple" >
                            <img src={curriculum} className="class-icon-p" />
                            <h2 style={{ marginBottom: 0, textAlign: 'center' }} className="regular">Curriculum</h2>
                            <p style={{ margin: 0 }} className="regular"></p>


                        </div> */}


                        <div className="class-box-purple">
                            <img src={studentImg} className="class-icon-p" />
                            <h2 style={{ marginBottom: 0, textAlign: 'center' }} className="regular">Students {this.state.totalstudents}</h2>
                            <p style={{ margin: 0 }} className="regular"></p>


                        </div>

                        {/* <div className="class-box-purple" >
                            <img src={testIcon} className="class-icon-p" />
                            <h2 style={{ marginBottom: 0, textAlign: 'center' }} className="regular"> Tests</h2>
                            <p style={{ margin: 0 }} className="regular"></p>


                        </div>



                        <div className="class-box-purple" >
                            <img src={feeIcon} className="class-icon-p" />
                            <h2 style={{ marginBottom: 0, textAlign: 'center' }} className="regular">Fee Register</h2>
                            <p style={{ margin: 0 }} className="regular"></p>


                        </div> */}


                    </div>

                    <div className='mid-grid'>
                        <div className='box-container'>
                            <div className='container-header-p'> <h3 className='center white'>Teachers</h3>

                            </div>

                            {/* list of teachers */}
                            <div class='container-body'>
                                {this.state.teachers.map((teacher) => {

                                    return (


                                        <div className='class-box-row ' style={{ justifyContent: 'space-between' }}>
                                            <div className='justify-left'>
                                                <img className="tables-icon" src={teacherpurpleicon} alt="dash" ></img>
                                                <h2 className='purple regular' >{teacher.userName}</h2>
                                            </div>

                                       

                                        </div>

                                    )

                                })

                                }

                            </div>
                        </div>

                        {/* list of classes */}
                        <div className='box-container'>
                            <div className='container-header-p'> <h3 className='center white'>Classes</h3>

                            </div>

                            <div class='container-body'>

                                {this.state.classes.map((item) => {

                                    return (
                                        <div style={{ width: '100%' }}>




                                            <div className='class-box-row ' style={{ justifyContent: 'space-between' }}>

                                                <div className='justify-left'>
                                                    <img className="tables-icon" src={classPurpleIcon} alt="dash" ></img>
                                                    <h2 className='purple regular' >{item.className}</h2>
                                                </div>

                                                <div className='small-text-container '>

                                                    <Link to={{

                                                        pathname: `${item.className}`,
                                                        state: {
                                                            className: item.className,
                                                            classId: item.id,

                                                        }
                                                    }} ><h2 className='white small-text' >View Attendance</h2>
                                                    </Link >

                                                    <Link to={{

                                                        pathname: `${item.id}/fees`,
                                                        state: {
                                                            className: item.className,
                                                            classId: item.id,

                                                        }
                                                    }}>
                                                        <h2 className='white small-text' >View Fees</h2>
                                                    </Link>
                                                    <Link to={{

                                                        pathname: `${item.id}/tests`,
                                                        state: {
                                                            className: item.className,
                                                            classId: item.id,

                                                        }
                                                    }}>

                                                        <h2 className='white small-text' >View Tests</h2>
                                                    </Link>

                                                </div>

                                            </div>

                                        </div>
                                    )

                                })

                                }





                            </div>

                        </div>
                    </div>



                    <div className="announcement-div">
                        <Announcements school={this.state.Notifications} />
                        <Drawer anchor="right" open={this.state.drawer} onClose={() => { this.setState({ drawer: false }) }} >
                            <Announcements school={this.state.Notifications} />
                        </Drawer>

                    </div>
                </div>




            </div>



        )
    }
}
export default dashboardPrincipalComponent;