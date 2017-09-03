import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer } from 'ionic-angular';
import { AddressServiceProvider  } from '../core/address-service/address-service';
import { Address } from '../core/address-service/address';
/**
 * Generated class for the AddressListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-list',
  templateUrl: 'address-list.html',
  providers: [AddressServiceProvider]
})
export class AddressListPage {
  public addressess: Promise<Address[]>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private addressService: AddressServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressListPage');
    this.addressess = this.addressService.fetchAll();
  }

  selectLocation(address: Address){
    this.navCtrl.setRoot(HomePage, {address});
  }

}
