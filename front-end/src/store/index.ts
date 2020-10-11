import { observable, action, toJS } from "mobx";
import * as searched from "../lib/api/searching";
import * as downloaded from "../lib/api/download";

export default class youtube {
  @observable searching: Object = [];
  @observable downloading: Object = [];

  @action.bound
  find = async (search_t: any) => {
    if (!search_t) {
      return null;
    } else {
      this.searching = await searched.search(search_t);
      (<any>this.searching) = toJS(this.searching);
    }
  };

  @action.bound
  download = async (title: any) => {
    const success = "Downloading Success";
    if (!title) {
      return null;
    } else {
      this.downloading = await downloaded.mp3(title);
      (<any>this.downloading) = success;
    }
  };
}
