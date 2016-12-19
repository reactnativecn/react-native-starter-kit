/**
 * Created by tdzl2003 on 12/18/16.
 */

// Fetch list of data by page.
// Each item should be immutable or observable.

import { observable, computed } from 'mobx';
import { ListView } from 'react-native';
import { get, uriToRelative } from './rpc';

export default class PageList {
  constructor(uri) {
    this.uri = uri;
    this.next = uri;
    setImmediate(() => {
      this.refresh();
    });
  }

  @observable
  isFetching = true;  // defaults to true, waiting first refresh.

  @observable
  isRefreshing = false;

  @observable
  data = [];

  @observable
  dataSource = new ListView.DataSource({ rowHasChanged: (v1, v2) => v1 !== v2 });

  // count is -1 when we don't know the count.
  @observable
  count = -1;

  @computed
  get isOver() {
    return this.count >= 0 && this.data.length >= this.count;
  }

  refresh() {
    this.isRefreshing = true;
    return this.fetch(true);
  }

  async fetch(refresh = false) {
    if ((!refresh && this.isFetching) || this.isOver) {
      return;
    }
    const uri = refresh ? this.uri : this.next;
    this.isFetching = true;

    const { count, next, results } = await get(uri);
    this.count = count;
    if (refresh) {
      // replace data
      this.data.replace(results);
      this.dataSource = this.dataSource.cloneWithRows(results);
      console.log(results);
      this.next = uriToRelative(next);
    } else if (uri === this.next) {
      // 检查uri防止重入
      this.data.splice(this.data.length, 0, ...results);
      this.dataSource = this.dataSource.cloneWithRows(this.data.slice());
      console.log(this.data.slice());
      this.next = uriToRelative(next);
    }
    this.isFetching = false;
    this.isRefreshing = false;
  }
}
