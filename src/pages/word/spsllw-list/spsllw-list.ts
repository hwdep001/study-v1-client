import { CommonProvider } from './../../../providers/common-provider';
import { WordProvider } from './../../../providers/word-provider';
import { WordSearchCondition } from './../../../models/WordSearchCondition';
import { Word } from './../../../models/Word';
import { Component, ViewChild } from '@angular/core';
import { NavParams, Content } from 'ionic-angular';

@Component({
    selector: 'page-spsllwList',
    templateUrl: 'spsllw-list.html'
})
export class SpsllwListPage {
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
                let ox: Array<string>;
                for (let i = 0; i < words_.length; i++) {
                    words_[i].flag1 = false;
                    const word = words_[i];
                    word.col06 = (word.col05 == "1") ? word.col02 : word.col03;
                    ox = [word.col02, word.col03];
                    ox.shuffleArray();
                    word.col02 = ox[0];
                    word.col03 = ox[1];
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
        const level: number = thumbCode + (word.levelId == undefined ? 0 : word.levelId);

        if (level > 2 || level < -2) {
            return;
        } else {
            this._word.updateWordLevel(word.id, level)
                .then(() => word.levelId = level);
        }
    }

    clickAnswer(seletedanswer: string, word: Word): void {
        word.col07 = (seletedanswer == word.col06) ? "an-t" : "an-f";
        word.flag1 = true;
    }

    //   requestModification(word: Word): void {
    //     const params = {
    //       activeName: CommonUtil.getActiveName(this.wsc.sub.id), 
    //       subId: this.wsc.sub.id,
    //       catId: this.wsc.cat.id,
    //       word: word
    //     }

    //     this.navCtrl.push(RequestPage, params);
    //   }

    shuffleQue(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        let words_: Array<Word> = this.words.shuffleArray();
        let ox: Array<string>;

        words_.forEach(word => {
            word.flag1 = false;
                word.col06 = (word.col05 == "1") ? word.col02 : word.col03;
                ox = [word.col02, word.col03];
                ox.shuffleArray();
                word.col02 = ox[0];
                word.col03 = ox[1];
        });

        this.words = words_;
        this.content.scrollToTop();

        loader.dismiss();
    }
}
