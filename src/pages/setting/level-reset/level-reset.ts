import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { SettingProvider } from './../../../providers/setting-provider';
import { LecProvider } from './../../../providers/lec-provider';

import { Lec } from './../../../models/Lec';

@Component({
    selector: 'page-levelReset',
    templateUrl: 'level-reset.html'
})
export class LevelReset {
    lecs: Array<Lec>;

    isResetBtn: boolean = false;

    // checkbox
    cbA: boolean = false;
    cbs: Array<boolean>;

    constructor(
        private navCtrl: NavController,
        private param: NavParams,
        private _cmn: CommonProvider,
        private _setting: SettingProvider,
        private _lec: LecProvider
    ) {
        this.initData();
    }

    initData(): void {
        const catId = this.param.get(`catId`);
        this.getLecs(catId);
    }

    getLecs(catId: number): void {
        this._lec.getLecsByCatId(catId).then(lecs_ => {
            this.lecs = lecs_;
            this.initCheckbox(false);
        });
    }

    closeModal(): void {
        this.navCtrl.pop();
    }

    resetLevel(): void {
        this._cmn.Alert.confirm("단어 레벨을 초기화하시겠습니까?").then(yes => {

            const loader = this._cmn.getLoader(null, null);
            loader.present();

            let selectLecIds: Array<number> = new Array();

            for (let i = 0; i < this.cbs.length; i++) {
                if (this.cbs[i]) {
                    selectLecIds.push(this.lecs[i].id);
                }
            }

            this._setting.resetLevelByLecIds(selectLecIds)
                .then(() => {
                    loader.dismiss();
                    this._cmn.Toast.present("top", "단어 레벨 초기화 성공", "toast-success");
                    this.closeModal();
                })
                .catch(err => {
                    loader.dismiss();
                    this._cmn.Toast.present("top", "단어 레벨 초기화 실패", "toast-fail");
                    this.closeModal();
                });

        }).catch(() => null);
    }

    initCheckbox(bl: boolean) {
        this.cbA = bl;
        this.isResetBtn = (this.lecs.length == 0) ? false : bl;

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
        let isExistTrue: boolean = false;
        this.cbs.every((ele, index) => {
            if (ele) {
                isExistTrue = true;
            }
            return !ele;
        });
        if (!isExistTrue) {
            this.isResetBtn = false;
            return;
        }

        this.isResetBtn = true;
    }
}
