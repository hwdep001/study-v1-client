import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { SettingProvider } from './../../../providers/setting-provider';
import { SubProvider } from './../../../providers/sub-provider';
import { LecProvider } from './../../../providers/lec-provider';

import { RoleSubCat } from './../../../models/RoleSubCat';

import { LevelReset } from './../level-reset/level-reset';

@Component({
    selector: 'page-wordMng',
    templateUrl: 'word-mng.html'
})
export class WordMngPage {
    rscs: Array<RoleSubCat>;

    constructor(
        private modalCtrl: ModalController,
        private _cmn: CommonProvider,
        private _setting: SettingProvider,
        private _sub: SubProvider,
        private _lec: LecProvider
    ) {
        this.initData();
    }

    initData(): void {
        this.getRoleSubCats();
    }

    getRoleSubCats(): void {
        this._setting.getRoleSubCatListByUid().then(rscs_ => {
            this.rscs = rscs_;
        });
    }

    moveLevelResetPage(catId: number): void {
        const params = {
            activeName: this._sub.getActiveName("setting"),
            catId: catId
        }

        this.modalCtrl.create(LevelReset, params).present();
    }

}
