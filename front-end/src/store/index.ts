import { observable, action, toJS } from "mobx";
import * as youtube from "../lib/api/youtube";

export default class RootStore {
  @observable searching: Object = [];
  @observable downloading: Object = [];

  @action.bound
  find = async (search_t: any) => {
    if (!search_t) {
      return null;
    } else {
      this.searching = await youtube.search(search_t);
      (<any>this.searching) = toJS(this.searching);
    }
  };

  @action.bound
  download_mp3 = async (title: any) => {
    const success = "Downloading Success_mp4";
    if (!title) {
      return null;
    } else {

      //success mp3 string
      this.downloading = await youtube.mp3(title);
    }
  };

  @action.bound
  download_mp4 = async (title: any) => {
    const success = "Downloading Success_mp3"
    if(!title) {
      return null
    } else {

      //success mp4 string
      this.downloading = await youtube.mp4(title)
    }
  }
}
