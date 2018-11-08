import { Component, ViewChild } from '@angular/core';
import { NavParams, Content } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { WordProvider } from './../../../providers/word-provider';

import { SearchCondition } from './../../../models/sub/SearchCondition';
import { Word } from './../../../models/Word';

@Component({
    selector: 'page-ewList',
    templateUrl: 'ew-list.html'
})
export class EwListPage {
    @ViewChild(Content) content: Content;

    words: Array<Word>;
    sc: SearchCondition;
    title: string;

    constructor(
        private param: NavParams,
        private _cmn: CommonProvider,
        private _word: WordProvider
    ) {
        this.initData();
    }

    initData(): void {
        this.sc = this.param.get("sc");

        this.setTitle();
        this.getWords();
    }

    setTitle(): void {
        if (this.sc.randomed) {
            this.title = this.sc.cat.name;
        } else {
            this.title = this.sc.lec.name;
        }
    }

    getWords(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this._word.getWordsBySearch(this.sc)
            .then(words_ => {
                for (let i = 0; i < words_.length; i++) {
                    words_[i].flag1 = false;
                }
                this.words = words_;
                loader.dismiss();

                this._cmn.Toast.present("bottom", words_.length + " 단어", null);
            })
            .catch(err => {
                loader.dismiss();
                console.log(err);
                alert(err);
            });
    }

    clickThumbs(word: Word, thumbCode: number): void {
        const preLevel: number = (word.levelId == undefined ? 0 : word.levelId);
        const level: number = thumbCode + preLevel;

        if (level > 2 || level < -2) {
            return;
        } else {
            this._word.updateWordLevel(word.id, level)
                .then()
                .catch(() => word.levelId = preLevel);
            word.levelId = level;
        }
    }

    // requestModification(word: Word): void {
    // const params = {
    //   activeName: CommonUtil.getActiveName(this.sc.sub.id), 
    //   subId: this.sc.sub.id,
    //   catId: this.sc.cat.id,
    //   word: word
    // }

    // this.navCtrl.push(RequestPage, params);
    // }

    orderQue(): void {
        this.sc.randomed = false;
        this.getWords();
    }

    shuffleQue(): void {
        this.sc.randomed = true;
        this.getWords();
    }
}
