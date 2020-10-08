import React from "react";
import { observer, inject } from "mobx-react";
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

interface TextProps {
  handleTitleChange: any;
}

interface TextState {
  y_title: Array<any>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: `${theme.spacing(1)}px`,
    },
    form: {
      marginTop: `${theme.spacing(6)}px`,
    },
  })
);

@inject("store")
@observer
class searchTitle extends React.Component<TextProps, TextState> {
  state = {
    y_title: [],
  };

  appChange = (e: any) => {
    return e.target.value;
  };

  render() {
    const { store }: any = this.props;
    const classes: any = this.props;
    return (
      <div className={classes.form}>
        <Grid>
          <div>
            <TextField
              id="search-title"
              label="Searching Music"
              onChange={(e: any) => store.find(this.appChange(e))}
            />
          </div>
        </Grid>
      </div>
    );
  }
}

export default searchTitle;
