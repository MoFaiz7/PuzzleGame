import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Axios from "axios";
import "./Pushlvl.css";
const Pushlvl = () => {
  const [pushlvl, setPushlvl] = useState({
    names: "",
    difficulty: "",
    url: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPushlvl((preValue) => {
      return {
        ...preValue,
        [name]: value,
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await Axios({
        method: 'post',
        url: '/api/admin/push',
        data: pushlvl
      });

      let data = res.data;
      alert(data.status)
    } catch (error) {
      console.log(error.response); // this is the main part. Use the response property from the error object

      return error.response;
    }
  }

  const reset = (() => {
    setPushlvl({
      names: "",
      difficulty: "",
      url: ""
    })
  })


  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Push Level</b>
            </h4>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={pushlvl.names}
                id="names"
                name="names"
                type="text"
              />
              <label htmlFor="Level">Level Name</label>
              {/* <span className="red-text">{errors.name}</span> */}
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={pushlvl.difficulty}
                id="difficulty"
                name="difficulty"
                type="text"
              />
              <label htmlFor="Difficulty">Difficulty Level</label>
              {/* <span className="red-text">{errors.name}</span> */}
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={pushlvl.url}
                id="url"
                name="url"
                type="text"
              />
              <label htmlFor="url">Paste image URL</label>
              {/* <span className="red-text">{errors.name}</span> */}
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <div className="spac">

                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Submit
                </button>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="reset"
                  onClick={reset}
                  className="btn btn-large waves-effect waves-light hoverable red accent-3"
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Pushlvl