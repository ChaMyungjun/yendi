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
  download_mp3 = async (title: any) => {
    const success = "Downloading Success";
    if (!title) {
      return null;
    } else {

      //success mp3 string
      this.downloading = await downloaded.mp3(title);
    }
  };

  @action.bound
  download_mp4 = async (title: any) => {
    const success = "Downloadin Success"
    if(!title) {
      return null
    } else {

      //success mp4 string
      this.downloading = await downloaded.mp4(title)
    }
  }
}
