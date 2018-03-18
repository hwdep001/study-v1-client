import { Component } from '@angular/core';

import { CommonProvider } from './../../../providers/common-provider';
import { SettingProvider } from './../../../providers/setting-provider';

import { RoleSubCat } from './../../../models/RoleSubCat';

@Component({
    selector: 'page-wordMng',
    templateUrl: 'word-mng.html'
})
export class WordMngPage {
    rscs: Array<RoleSubCat>;

    constructor(
        private _cmn: CommonProvider,
        private _setting: SettingProvider
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

    resetLevel(catId: number): void {
        this._cmn.Alert.confirm("단어 레벨을 초기화하시겠습니까?").then(yes => {

            const loader = this._cmn.getLoader(null, null);
            loader.present();

            this._setting.resetLevelByCat(catId)
                .then(() => {
                    loader.dismiss();
                    this._cmn.Toast.present("top", "단어 레벨 초기화 성공", "toast-success");
                })
                .catch(err => {
                    loader.dismiss();
                    this._cmn.Toast.present("top", "단어 레벨 초기화 실패", "toast-fail");
                });

        }).catch(() => null);
    }
}
