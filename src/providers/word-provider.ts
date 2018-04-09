import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { WordSearch } from './../models/WordSearch';
import { Word } from './../models/Word';
import { Level } from './../models/Level';

@Injectable()
export class WordProvider {

    private reqUrl: String;

    constructor(
        public http: HttpClient,
        private _auth: AuthProvider
    ) {
        this.reqUrl = environment.requestUrl;
    }

    getWordSearchData(catId: number): Promise<Map<string, any>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Map<string, any>>((resolve, reject) => {

                const reqData = {
                    catId: catId
                }

                this.http.post(`${this.reqUrl}/word/search-condition`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Map<string, any>);
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

    getWordsBySearch(wordSearch: WordSearch): Promise<Array<Word>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = wordSearch;

                this.http.post(`${this.reqUrl}/word/search`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<Word>);
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

    updateWordLevel(wordId: number, levelId: number): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = {
                    uid: this._auth.uid,
                    wordId: wordId,
                    levelId: levelId
                }

                this.http.post(`${this.reqUrl}/word/level/update`, reqData, {
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

    getLevels(): Array<Level> {
        let levels = new Array<Level>();
        // levels.push({id: 2, name: "Very easy"});
        // levels.push({id: 1, name: "Easy"});
        // levels.push({id: 0, name: "Normal"});
        // levels.push({id: -1, name: "Difficult"});
        // levels.push({id: -2, name: "Very difficult"});
        levels.push({id: 2, name: "2"});
        levels.push({id: 1, name: "1"});
        levels.push({id: 0, name: "0"});
        levels.push({id: -1, name: "-1"});
        levels.push({id: -2, name: "-2"});
        return levels;
    }
}