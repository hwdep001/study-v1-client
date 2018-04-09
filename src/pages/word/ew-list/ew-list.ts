import { Component, ViewChild } from '@angular/core';
import { NavParams, Content } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { WordProvider } from './../../../providers/word-provider';

import { WordSearchCondition } from './../../../models/WordSearchCondition';
import { Word } from './../../../models/Word';

@Component({
    selector: 'page-ewList',
    templateUrl: 'ew-list.html'
})
export class EwListPage {
    @ViewChild(Content) content: Content;

    words: Array<Word>;
    wsc: WordSearchCondition;
    title: string;

    constructor(
        private param: NavParams,
        private _cmn: CommonProvider,
        private _word: WordProvider
    ) {
        this.initData();
    }

    initData(): void {
        this.wsc = this.param.get("wsc");

        this.setTitle();
        this.getWords();
    }

    setTitle(): void {
        if (this.wsc.randomed) {
            this.title = this.wsc.cat.name;
        } else {
            this.title = this.wsc.lec.name;
        }
    }

    getWords(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this._word.getWordsBySearch(this.wsc)
            .then(words_ => {
                for (let i = 0; i < words_.length; i++) {
                    words_[i].flag1 = false;
                }
                this.words = words_;
                loader.dismiss();
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
    //   activeName: CommonUtil.getActiveName(this.wsc.sub.id), 
    //   subId: this.wsc.sub.id,
    //   catId: this.wsc.cat.id,
    //   word: word
    // }

    // this.navCtrl.push(RequestPage, params);
    // }

    shuffleQue(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        let words_: Array<Word> = this.words.shuffleArray();

        words_.forEach(word => {
            word.flag1 = false;
        });

        this.words = words_;
        this.content.scrollToTop();

        loader.dismiss();
    }
}
