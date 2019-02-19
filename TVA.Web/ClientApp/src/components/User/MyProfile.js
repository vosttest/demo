import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

import GridItem from "../shared/Grid/GridItem";
import GridContainer from "../shared/Grid/GridContainer";
// core components
import CustomInput from "../shared/CustomInput/CustomInput";
import Button from "../shared/CustomButtons/Button";
import Card from "../shared/Card/Card";
import CardHeader from "../shared/Card/CardHeader";
import CardAvatar from "../shared/Card/CardAvatar";
import CardBody from "../shared/Card/CardBody";
import CardFooter from "../shared/Card/CardFooter";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import avatar from "../../assets/img/faces/marc.jpg";

import { actionCreators } from '../../store/User/MyProfile';


const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
        fontWeight: "0",
        fontFamily: "'Helvetica', 'Arial', sans-serif"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone:'',
            newUser: {},
            editingProfile: {}
        };
    }

    componentDidMount() {
        this.props.readProfile();
    }

    render() {
        const { classes, handleInput,handleUpdate, userName, email, firstName, lastName, gender, birthday, phone, startedOn, position, rsp} = this.props;
        return (
            <section>
                <div className="card">
                    <div className="card-header">
                        My Profile Infomation
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">
                                <span className="card-field">
                                    Username
                                </span>
                                {rsp.userName}
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Full name
                                </span>
                                {rsp.firstName} {rsp.lastName}
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Department
                                </span>
                                CWS - Crimsonworks
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Position
                                </span>
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Started On
                                </span>
                            </div>
                            <div className="col-md-2">
                                <span className="card-field">
                                    Ended On
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card1">
                    <div>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                                <Card>
                                    <CardHeader color="info">
                                        <h4 className={classes.cardTitleWhite}>My Profile Info</h4>
                                        <p className={classes.cardCategoryWhite}>Complete your profile</p>
                                    </CardHeader>
                                    <CardBody>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={5}>
                                                <CustomInput
                                                    labelText="Company (disabled)"
                                                    id="company-disabled"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        disabled: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={3}>
                                                <CustomInput
                                                    inputProps={{
                                                        onChange: handleInput,
                                                        type: "text",
                                                        name: "userName",
                                                        value: userName
                                                    }}
                                                    labelText="Username"
                                                    id="username"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    inputProps={{
                                                        onChange: handleInput,
                                                        type: "text",
                                                        value: email,
                                                        name: "email"
                                                    }}
                                                    labelText="Email address"
                                                    id="email-address"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    inputProps={{
                                                        onChange: handleInput,
                                                        type: "text",
                                                        value: firstName,
                                                        name: "firstName"
                                                    }}
                                                    labelText="First Name"
                                                    id="first-name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                                <CustomInput
                                                    inputProps={{
                                                        onChange: handleInput,
                                                        type: "text",
                                                        value: lastName,
                                                        name: "lastName"
                                                    }}
                                                    labelText="Last Name"
                                                    id="last-name"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={2}>
                                                <CustomInput
                                                    inputProps={{
                                                        onChange: handleInput,
                                                        value: gender,
                                                        name: "gender"
                                                    }}
                                                    labelText="Gender"
                                                    id="gender"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={5}>
                                                <CustomInput
                                                    inputProps={{
                                                        onChange: handleInput,
                                                        value: birthday,
                                                        name: "birthday"
                                                    }}
                                                    labelText="Birthday"
                                                    id="birthday"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={5}>
                                                <CustomInput
                                                    inputProps={{
                                                        onChange: handleInput,
                                                        value: phone,
                                                        name: "phone"
                                                    }}
                                                    labelText="Phone"
                                                    id="phone"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                                                <CustomInput
                                                    id="about-me"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        multiline: true,
                                                        rows: 5
                                                    }}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" onClick={handleUpdate}>Update Profile</Button>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                                <Card profile>
                                    <CardAvatar profile>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img src={avatar} alt="" />
                                        </a>
                                    </CardAvatar>
                                    <CardBody profile>
                                        <h6 className={classes.cardCategory}>FUNCTION LEAD</h6>
                                        <h4 className={classes.cardTitle}>{rsp.firstName} {rsp.lastName}</h4>
                                        <p className={classes.description}>
                                            Don't be scared of the truth because we need to restart the
                                            human foundation in truth And I love you like Kanye loves Kanye
                                            I love Rick Owens’ bed design but the back is...
                                        </p>
                                        <Button color="primary" round>
                                            Change Password
                                        </Button>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </section>
        );
    }
}
export default connect(
    state => state.userProfile,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(MyProfile));
