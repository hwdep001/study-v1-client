import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { AuthProvider } from './../../../providers/auth-provider';
import { SubProvider } from './../../../providers/sub-provider';
import { WordProvider } from './../../../providers/word-provider';

import { Level } from './../../../models/Level';
import { Sub } from './../../../models/Sub';
import { Cat } from './../../../models/Cat';
import { Lec } from './../../../models/Lec';
import { WordSearchCondition } from './../../../models/WordSearchCondition';

import { SpsllwListPage } from './../spsllw-list/spsllw-list';
import { KwListPage } from './../kw-list/kw-list';
import { CcListPage } from './../cc-list/cc-list';
import { C4ListPage } from './../c4-list/c4-list';
import { EwListPage } from './../ew-list/ew-list';

@Component({
    selector: 'page-wordSearch',
    templateUrl: 'word-search.html'
})
export class WordSearchPage {

    sub: Sub;
    cat: Cat;
    lecs: Array<Lec>;
    levs: Array<Level>;
    cnts: Array<number>;

    lecRange: any = { lower: 1, upper: 1 };

    selectLecs: Array<number>;
    selectLevs: Array<number>;
    selectCnt: number;
    selectLecType: number = 0;  // 0: Checkbox, 1: Range

    isStartBtn: boolean = false;

    // checkbox
    cbA: boolean = false;
    cbs: Array<boolean>;

    constructor(
        public navCtrl: NavController,
        private param: NavParams,
        private _cmn: CommonProvider,
        private _auth: AuthProvider,
        private _sub: SubProvider,
        private _word: WordProvider
    ) {
        this.initData();
    }

    initData(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this.sub = this.param.get("sub");
        this.cat = this.param.get("cat");
        this.getLevs();
        this.getWordSearchCondition()
            .then(() => loader.dismiss())
            .catch(err => {
                loader.dismiss();
                console.log();
                alert(err);
            })
    }

    getWordSearchCondition(): Promise<any> {
        return this._word.getWordSearchCondition(this.cat.id)
            .then(dataMap => {
                this.lecs = dataMap["lecs"];
                this.initCheckbox(false);
                this.lecRange = { lower: 1, upper: this.lecs.length };

                this.cnts = dataMap["cnts"];
                this.selectCnt = this.cnts[4];
            });
    }

    getLevs(): void {
        this.selectLevs = new Array<number>();

        this.levs = this._word.getLevels();
        let levIds = new Array<number>();
        this.levs.forEach(lev => {
            levIds.push(lev.id);
        });
        this.selectLevs = levIds;
    }

    initCheckbox(bl: boolean) {
        this.cbA = bl;
        this.isStartBtn = (this.lecs.length == 0) ? false : bl;

        this.cbs = new Array<boolean>();
        for (let i = 0; i < this.lecs.length; i++) {
            this.cbs.push(bl);
        }
    }

    checkCb(cb: boolean) {
        if (!cb) {
            this.cbA = false;
        } else {
            let result: boolean = true;
            this.cbs.every((ele, index) => {
                if (!ele) {
                    this.cbA = false;
                    result = false;
                }
                return ele;
            });
            if (result) { this.cbA = true; }
        }
    }

    checkStartBtn(): void {
        if (this.selectLevs.length == 0) {
            this.isStartBtn = false;
            return;
        }

        if (this.selectLecType == 0) {
            let isExistTrue: boolean = false;
            this.cbs.every((ele, index) => {
                if (ele) {
                    isExistTrue = true;
                }
                return !ele;
            });
            if (!isExistTrue) {
                this.isStartBtn = false;
                return;
            }
        }

        this.isStartBtn = true;
    }

    startTest() {
        this.setSelectLecs();

        const params = {
            activeName: this._sub.getActiveName(this.sub.id),
            wsc: new WordSearchCondition(this.sub,
                this.cat, null, this.selectLecs, this.selectLevs, 
                this.selectCnt, true, this._auth.uid
            )
        }

        switch (this.sub.id) {
            case "sp":
            case "sl":
            case "lw":
                this.navCtrl.push(SpsllwListPage, params);
                break;
            case "kw":
                this.navCtrl.push(KwListPage, params);
                break;
            case "cc":
                this.navCtrl.push(CcListPage, params);
                break;
            case "c4":
                this.navCtrl.push(C4ListPage, params);
                break;
            case "ew":
                this.navCtrl.push(EwListPage, params);
                break;
        }
    }

    setSelectLecs(): void {
        let selectLecs: Array<number> = new Array();
        if (this.selectLecType == 0) {
            // checkbox
            for (let i = 0; i < this.cbs.length; i++) {
                if (this.cbs[i]) {
                    selectLecs.push(this.lecs[i].id);
                }
            }
        } else {
            // range
            for (let i = this.lecRange.lower; i <= this.lecRange.upper; i++) {
                selectLecs.push(this.lecs[i - 1].id);
            }
        }

        this.selectLecs = selectLecs;
    }
}
