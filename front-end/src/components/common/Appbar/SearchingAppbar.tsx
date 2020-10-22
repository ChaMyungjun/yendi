import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import styles from "../styles/SearchingAppbar.module.css";
import SearchTitle from "../../search/searchTitle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#ff6e40",
    },
    error: {
      main: "#009688",
    },
    text: {
      primary: "#212121",
    },
  },
});

interface TextProps {
  handleChangeSearch: any;
}

interface TextState {
  search_title: any;
  title: any;
}

@observer
class SearchingAppbar extends React.Component<TextProps, TextState> {
  state = {
    title: "",
    search_title: "",
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className={styles.form}>
          <AppBar position="fixed" style={{ paddingBottom: "10rem" }}>
            <Toolbar className={styles.toolBar}>
              <Link to="/" className={styles.title}>
                Youtube Downloader
              </Link>
              <SearchTitle handleTitleChange={this.props.handleChangeSearch} />
            </Toolbar>
          </AppBar>
        </div>
      </ThemeProvider>
    );
  }
}

export default SearchingAppbar;
