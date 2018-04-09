import { Component, ViewChild } from '@angular/core';
import { NavParams, AlertController, Content } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { WordProvider } from './../../../providers/word-provider';

import { WordSearchCondition } from './../../../models/WordSearchCondition';
import { Word } from './../../../models/Word';

@Component({
    selector: 'page-c4List',
    templateUrl: 'c4-list.html'
})
export class C4ListPage {
    @ViewChild(Content) content: Content;

    words: Array<Word>;
    wsc: WordSearchCondition;
    title: string;
    queFlag: boolean = false;

    constructor(
        private param: NavParams,
        private alertCtrl: AlertController,
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
    //     const params = {
    //         activeName: CommonUtil.getActiveName(this.wsc.sub.id),
    //         subId: this.wsc.sub.id,
    //         catId: this.wsc.cat.id,
    //         word: word
    //     }

    //     this.navCtrl.push(RequestPage, params);
    // }

    settingQue(): void {
        this.presentRadioAlert(null, "설정", this.queFlag).then(data => {
            this.queFlag = data;
        });
    }

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

    private presentRadioAlert(message: string, title: string, defaultValue: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let radio = this.alertCtrl.create({
                title: title,
                message: message,
                inputs: [
                    {
                        type: 'radio',
                        label: '한자',
                        value: 'false',
                        checked: defaultValue ? false : true
                    },
                    {
                        type: 'radio',
                        label: '한자 + 음',
                        value: 'true',
                        checked: defaultValue ? true : false
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: data => {
                            reject();
                        }
                    },
                    {
                        text: 'Select',
                        handler: data => {
                            resolve(data == "true" ? true : false);
                        }
                    }
                ]
            });
            radio.present();
        });
    }

}
