import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Game from "./Game";
import axios from "axios";
import Admindash from './Admindash'

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  state = {
    usr:"",
    start: false,
    level: 0,
    time: 0,
    admin:false
  }

  onStartClick = e => {
    e.preventDefault();
    this.setState({
      start: true
    })
  }

  onAdminClick = e => {
    e.preventDefault();
    this.setState({
      admin: true
    })
  }  



  render() {
    const { user } = this.props.auth;
    // console.log(user);
    const fetch = async () => {
      try {
        // console.log(typeof (username.userName));
        const res = await axios({
          method: 'post',
          url: '/api/users/gusrinfo',
          data: {
            user: user.name.split(" ")[0]
          }
        });
        // console.log(res);
        this.setState({
          level: res.lvl,
          time: res.time,
          usr: res.name
        })

      } catch (error) {
        console.log(error);
      }
    }

    // fetch();

    return (
      <>
        {this.state.start === false && this.state.admin=== false ? <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="landing-copy col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into the-tricky{" "}
                  <span style={{ fontFamily: "monospace" }}>PuZzLe</span> app 👏
                  <br />
                  {/* <span>Total Level Cleared: {this.state.level}  </span>{"    "}
                  <span>Total Time Taken: {this.state.time}</span> */}
                </p>
              </h4>
              <div className="spac">

                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={user.name.split(" ")[0]==='admin'?this.onAdminClick:this.onStartClick}
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                  {user.name.split(" ")[0]==='admin'?"Lets_Start":"Start_Game"}
                </button>

                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>


              </div>
            </div>
        </div>
        </div> : ""}
        {this.state.start === true && this.state.admin===false ? <Game user={user.name.split(" ")[0]} start={this.state.start} /> : ""}
        {this.state.admin === true ? <Admindash user={user.name.split(" ")[0]}  /> : ""}
        {/* <Pushlvl/> */}
      </>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
