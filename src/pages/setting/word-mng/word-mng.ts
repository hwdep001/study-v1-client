import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { SettingProvider } from './../../../providers/setting-provider';
import { SubProvider } from './../../../providers/sub-provider';

import { RoleSub7CatList } from './../../../models/sub/RoleSub7CatList';

import { LevelReset } from './../level-reset/level-reset';

@Component({
    selector: 'page-wordMng',
    templateUrl: 'word-mng.html'
})
export class WordMngPage {
    rscs: Array<RoleSub7CatList>;

    constructor(
        private modalCtrl: ModalController,
        private _setting: SettingProvider,
        private _sub: SubProvider
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
