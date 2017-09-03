import { HomePage } from '../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SetupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  name = '';
  extension = '';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
              this.name = navParams.data.name;
              this.extension = navParams.data.extension;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
  }
  
  setInfo(){
    this.navCtrl.setRoot(HomePage)
  }

}
