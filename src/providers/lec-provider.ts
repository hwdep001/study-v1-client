import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { Lec } from './../models/Lec';

@Injectable()
export class LecProvider {

  private reqUrl: String;

  constructor(
    public http: HttpClient,
    private _auth: AuthProvider
  ) {
    this.reqUrl = environment.requestUrl;
  }

  getLecsByCatId(catId: number): Promise<Array<Lec>> {
    return this._auth.getIdToken().then(idToken => {
      return new Promise<Array<Lec>>((resolve, reject) => {

        const reqData = {
          catId: catId
        }

        this.http.post(`${this.reqUrl}/lec/list`, reqData, {
          headers: new HttpHeaders().set('Authorization', idToken)
        }).subscribe(data => {
          
          const resData = data as ResponseDate;

          if(resData.res) {
            resolve(resData.data as Array<Lec>);
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