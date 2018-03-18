import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// environment
import { environment } from './../environments/environment';

// providers
import { CommonProvider } from './../providers/common-provider';
import { AuthProvider } from './../providers/auth-provider';
import { HomeProvider } from './../providers/home-provider';
import { SubProvider } from './../providers/sub-provider';
import { CatProvider } from './../providers/cat-provider';
import { LecProvider } from './../providers/lec-provider';
import { WordProvider } from './../providers/word-provider';
import { SettingProvider } from './../providers/setting-provider';

// pages
import { BackgroundPage } from './../pages/background/background';
import { SignInPage } from './../pages/sign-in/sign-in';
import { HomePage } from './../pages/home/home';
import { CatListPage } from './../pages/cat-list/cat-list';
import { LecListPage } from './../pages/lec-list/lec-list';
import { WordSearchPage } from './../pages/word/search/word-search';
import { SpsllwListPage } from './../pages/word/spsllw-list/spsllw-list';
import { KwListPage } from './../pages/word/kw-list/kw-list';
import { CcListPage } from './../pages/word/cc-list/cc-list';
import { C4ListPage } from './../pages/word/c4-list/c4-list';
import { EwListPage } from './../pages/word/ew-list/ew-list';
import { SettingTabPage } from './../pages/setting/setting-tab';
import { InfoPage } from './../pages/setting/info/info';
import { WordMngPage } from './../pages/setting/word-mng/word-mng';

@NgModule({
    declarations: [
        MyApp,
        BackgroundPage,
        SignInPage,
        HomePage,
        CatListPage,
        LecListPage,
        WordSearchPage,
        SpsllwListPage,
        KwListPage,
        CcListPage,
        C4ListPage,
        EwListPage,
        SettingTabPage,
        InfoPage,
        WordMngPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, { tabsPlacement: 'top' }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        BackgroundPage,
        SignInPage,
        HomePage,
        CatListPage,
        LecListPage,
        WordSearchPage,
        SpsllwListPage,
        KwListPage,
        CcListPage,
        C4ListPage,
        EwListPage,
        SettingTabPage,
        InfoPage,
        WordMngPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CommonProvider,
        AuthProvider,
        HomeProvider,
        SubProvider,
        CatProvider,
        LecProvider,
        WordProvider,
        SettingProvider
    ]
})
export class AppModule { }
