import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { Cat } from './../models/Cat';

@Injectable()
export class CatProvider {

  private reqUrl: String;

  constructor(
    public http: HttpClient,
    private _auth: AuthProvider
  ) {
    this.reqUrl = environment.requestUrl;
  }

  getCatsBySubId(subId: string): Promise<Array<Cat>> {
    return this._auth.getIdToken().then(idToken => {
      return new Promise<Array<Cat>>((resolve, reject) => {

        const reqData = {
          uid: this._auth.uid,
          subId: subId
        }

        this.http.post(`${this.reqUrl}/cat/list`, reqData, {
          headers: new HttpHeaders().set('Authorization', idToken)
        }).subscribe(data => {
          
          const resData = data as ResponseDate;

          if(resData.res) {
            resolve(resData.data as Array<Cat>);
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