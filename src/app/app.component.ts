import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { CategoriesPage } from '../pages/categories/categories';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../providers/user/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage; 
  pages: Array<{title: string, component?: any,icon:string}>;
  private _loading;
  private user;

  constructor(
    private fireBase: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    public platform: Platform, 
    public statusBar: StatusBar, 
    private userSrv: UserProvider,
    public splashScreen: SplashScreen) {
    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:"home" },
      { title: 'Categories', component: CategoriesPage, icon:"archive" },
      { title: 'Settings', component: SettingsPage, icon:"settings" },
      { title: 'Log-Off', icon:"exit"}
    ];

  }
 

  initializeApp() {
    

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title === "Log-Off"){
      this.showLoader();
      this.afAuth.auth.signOut().then(()=> {
        this.hideLoader();
        this.nav.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});
      }, function(error) {
        this.hideLoader();
        // An error happened.
      });;

      return;
    }
    this.nav.setRoot(page.component);
  }

  showLoader(){
    this._loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this._loading.present();
  }

  hideLoader(){
    this._loading.dismiss();
  }

}
