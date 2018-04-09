import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { RoleSubCat } from './../models/RoleSubCat';

@Injectable()
export class SettingProvider {

    private reqUrl: String;

    constructor(
        public http: HttpClient,
        private _auth: AuthProvider
    ) {
        this.reqUrl = environment.requestUrl;
    }

    getRoleSubCatListByUid(): Promise<Array<RoleSubCat>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<RoleSubCat>>((resolve, reject) => {

                const reqData = {
                    uid: this._auth.uid
                }

                this.http.post(`${this.reqUrl}/setting/word-mng/sub-cat/list`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<RoleSubCat>);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        console.log(msg);
                        reject(msg);
                    }

                }, err => {
                    console.log(err);
                    reject(err);
                });
            });
        });
    }

    resetLevelByCat(catId: number): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = {
                    uid: this._auth.uid,
                    catId: catId
                }

                this.http.post(`${this.reqUrl}/setting/word-mng/level/reset`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve();
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

}