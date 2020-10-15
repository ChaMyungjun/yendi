import React from "react";
import {
  Typography,
  Button,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  state = {
      login_chk: 0
  }
    render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <Link to="/">MP3</Link>
            <Link to="/">MP4</Link>
            <Link to="/">My Page</Link>
          </div>
        </div>
        {this.state.login_chk ? (
            <div>
                <div>
                    Welocome
                </div>
                
                
                {/* back Logout function create - 204 status
                <Button onClick = {onLogout}>Logout</Button> */}
            </div>
        ): (
            <div>
                <Button href = '/login'>SIGN IN</Button>
            </div>
        )}
      </React.Fragment>
    );
  }
}

export default Menu;
