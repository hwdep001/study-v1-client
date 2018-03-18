import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SubProvider } from './../../providers/sub-provider';
import { CatProvider } from './../../providers/cat-provider';

import { LecListPage } from './../lec-list/lec-list';

import { Sub } from './../../models/Sub';
import { Cat } from './../../models/Cat';

@Component({
  selector: 'page-catList',
  templateUrl: 'cat-list.html'
})
export class CatListPage {

  sub: Sub;
  cats: Array<Cat>;

  constructor(
    public navCtrl: NavController,
    private param: NavParams,
    private _sub: SubProvider,
    private _cat: CatProvider
  ) {
    this.initData();
  }

  initData(): void {
    const subId = this.param.get('id');
    this.sub = this._sub.getSub(subId);
    
    this.getCats(subId);
  }

  getCats(subId: string): void {
    this._cat.getCatsBySubId(subId).then(cats_ => {
      this.cats = cats_;
    });
  }

  clickCat(cat: Cat): void {
    this.navCtrl.push(LecListPage, {
      activeName: this._sub.getActiveName(this.sub.id), sub: this.sub, cat: cat});
  }

}
