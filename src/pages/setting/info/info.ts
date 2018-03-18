import { Component } from '@angular/core';

import { AuthProvider } from './../../../providers/auth-provider';

import { User } from './../../../models/User';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  user: User;

  constructor(
    private _auth: AuthProvider
  ) {
    this.user = _auth.user;
  }

  signOut() {
    this._auth.signOut();
  }

}
