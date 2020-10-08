import { observable, action, toJS } from "mobx";
import * as searched from "../lib/api/searching";

export default class youtube {
  @observable searching: Object = [];

  @action.bound
  find = async (search_t: any) => {
    if (!search_t) {
      return null;
    } else {
      this.searching = await searched.search(search_t);
      (<any>this.searching) = toJS(this.searching);
    }
  };
}
