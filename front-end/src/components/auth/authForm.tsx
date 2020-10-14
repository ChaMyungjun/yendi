import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const textMap = {
  login: "로그인",
  register: "회원가입",
};

class authForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <form>
            <input autoComplete="off" name="username" placeholder="ID" />
            <input autoComplete = "off" name = "password" placeholder = "Password" />
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default authForm;
