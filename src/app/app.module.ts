import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { CategoriesPage } from '../pages/categories/categories';
import { SettingsPage } from '../pages/settings/settings';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule, FirebaseAppProvider } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { FIREBASE_CREDENTIALS } from "./firebase_credentials";
import { RegisterPage } from '../pages/register/register';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserProvider } from '../providers/user/user';
import { ComponentsModule } from '../components/components.module';
import { CategoriesProvider } from '../providers/categories/categories';
import { BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CommonProvider } from '../providers/common/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriesPage, 
    LoginPage,
    SettingsPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    ComponentsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriesPage, 
    LoginPage,
    SettingsPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseAppProvider,
    UserProvider, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriesProvider,
    CommonProvider
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}

