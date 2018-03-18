import { Component } from '@angular/core';

import { AuthProvider } from './../../providers/auth-provider';

@Component({
  selector: 'page-signIn',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
 
  constructor(
    private _auth: AuthProvider
  ) {
  }

  signInWithGoogle() {
    this._auth.signInWithGoogle();
  }
}