import { AddressListPage } from './address-list/address-list';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';
import { AgmCoreModule} from 'angular2-google-maps/core';
import { NgxElectronModule} from 'ngx-electron'

import { MyApp } from './app.component';
import { HomePage } from './home/home';
import { SetupPage} from './setup/setup';
import { AddressServiceProvider } from "./core/address-service/address-service";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetupPage,
    AddressListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot(),
    NgxElectronModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetupPage,
    AddressListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AddressServiceProvider
  ]
})
export class AppModule {}
