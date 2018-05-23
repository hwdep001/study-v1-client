import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { WordCount } from './../models/sub/WordCount';

@Injectable()
export class HomeProvider {

    private reqUrl: String;

    constructor(
        public http: HttpClient,
        private _auth: AuthProvider
    ) {
        this.reqUrl = environment.requestUrl;
    }

    getWordCountGroupBySub(): Promise<Array<WordCount>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<WordCount>>((resolve, reject) => {

                const reqData = {
                    uid: this._auth.uid
                }

                this.http.post(`${this.reqUrl}/home/word-count`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<WordCount>);
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

}