import React, {Component} from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setCurrentLoginForm, setGlobalToken } from '../../store/globalsReducer.js'
import $ from 'jquery';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {executePromises, getLoginData} from './Login_helper.js';
import app_store from './../../assets/appstore.svg';
import googleplay_store from './../../assets/googleplaystore.png';

import './Login.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uname: null,
      pwd: null,
      errorMessage: null,
    }
  }

  inputChangeHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;

    this.setState({[name] : val});
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    var uname = this.state.uname;
    var pwd = this.state.pwd;
    document.getElementById("errorMessage").style.display = "hidden";
    executePromises(uname, pwd, this).then((result) => {
      if(result === 1){
        this.props.setGlobalToken(getLoginData()[1]);
        this.props.history.push("/dashboard");
      }
    });
    return false;
  }

  openSignUpForm = (event) => {
    this.props.setCurrentLoginForm("SignUp");
  }

  componentDidMount(){
    // enables the popover for refreshing servers on login tool tip
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()
    if($(window).width() <= 768) {
      document.getElementById("popover").setAttribute("data-trigger", "focus");
    }
  }

  render() {
    return(
      <div className = "row login-form-row">
        <div className = {"col-lg-8 col-md-10 col-sm-12 login-form-wrapper"}>
          <h1>knowledgeforum.org</h1>
          <form onSubmit={this.formSubmitHandler} className = "loginForm" id = "loginForm" autoComplete="on">

            <div className = "login-input-wrapper">
              <i className="fas fa-user"></i>
              <input type="text" id="uname" name="uname" placeholder="Username" required onChange={this.inputChangeHandler}></input>
            </div>

            <div className = "login-input-wrapper">
              <i className="fas fa-lock"></i>
              <input type="password" id="pwd" name="pwd" placeholder="Password" required onChange={this.inputChangeHandler}></input>
            </div>

            <div className = "login-checkbox-wrapper">
              <input type="checkbox" id="refreshCheckbox" name="refreshCheckbox"></input>
              <label htmlFor="refreshCheckbox">Refresh my servers on login?</label>
              <span id="popover" tabIndex="0" role="button" data-toggle="popover"
                data-trigger="hover" data-content="Check this box if you have registered to any new knowledge forums servers since your last login.">
              <i className="far fa-question-circle"></i></span>
            </div>

            <div>
              <p style={{display:'hidden',color:'red'}} id = "errorMessage" name="errorMessage">{this.state.errorMessage}</p>
            </div>

            <input className = "login-button" type="submit" value="Login"></input>

          </form>

          <p className="login-create-account-p" onClick={this.openSignUpForm}>Don't have an account? Sign up <i className="far fa-arrow-alt-circle-right"></i></p>
          <div className="login-apps-div">
            <a href="itms-apps://apps.apple.com/us/app/id1554705711"><img className="login-appstore-img" src={app_store} alt={"Apple App Store"}/></a>
            <a style={{marginLeft: "10px"}} href="https://play.google.com/store/apps/details?id=com.kf6mobile&hl=en_US&gl=US"><img className="login-appstore-img" src={googleplay_store} alt={"Google Play Store"}/></a>
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = {
    setGlobalToken,
    setCurrentLoginForm
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(LoginForm)
