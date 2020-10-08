import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import SearchingAppbar from "./components/public/Appbar/SearchingAppbar";
import SearchResult from "./components/search/searchResult";

@inject("store")
@observer
class App extends React.Component {
  handleTitle = async (search_title: any) => {
    console.log(search_title);
  };

  render() {
    const { store }: any = this.props;
    return (
      <div>
        <SearchingAppbar handleChangeSearch={this.handleTitle} />
        {toJS(store).searching.length === 0 ? (
          <Typography>Empty</Typography>
        ) : (
          <SearchResult />
        )}
      </div>
    );
  }
}

export default App;
