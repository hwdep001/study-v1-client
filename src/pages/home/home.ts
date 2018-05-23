import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SubProvider } from './../../providers/sub-provider';
import { HomeProvider } from './../../providers/home-provider';

import { WordCount } from './../../models/sub/WordCount';

import { CatListPage } from './../cat-list/cat-list';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    wordCounts: Array<WordCount>;

    constructor(
        public navCtrl: NavController,
        private _sub: SubProvider,
        private _home: HomeProvider
    ) {
        this.initData();
    }

    initData(): void {
        this.getWordCounts();
    }

    getWordCounts(): void {
        this._home.getWordCountGroupBySub()
            .then(wordCounts_ => {
                this.wordCounts = wordCounts_;
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    clickSub(subId: string): void {
        const params = {
            activeName: this._sub.getActiveName(subId),
            id: subId
        }
        this.navCtrl.setRoot(CatListPage, params);
    }
}
