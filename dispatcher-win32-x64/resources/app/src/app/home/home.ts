import { Address } from './../core/address-service/address';
import { Component } from '@angular/core';
import { FabContainer, NavController, NavParams } from 'ionic-angular';
import { AddressListPage, SetupPage} from '../../app/pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  setup = SetupPage;
  address: Address;
  defaultMapInfo = {
    lat: 3.0015283,
    lng: 101.5442709
  };
  located = false;

  constructor(public navCtrl: NavController,
              private navParams: NavParams) {
    this.address = navParams.data.address;
    if (this.address){
      this.located = true;
    }

  }

  getLatitude() : number{
    return this.located ? Number(this.address.latitude) : this.defaultMapInfo.lat;
  }

  getLongtitude() : number{
    return this.located ? Number(this.address.longtitude) : this.defaultMapInfo.lng;
  }

  gotoSetup(fab:FabContainer){
    fab.close();
    this.navCtrl.push(SetupPage, {}, { animate:true, direction:'forward'});
  }

  gotoLocations(fab:FabContainer){
    fab.close();
    this.navCtrl.setRoot(AddressListPage);
  }

  close(fab:FabContainer){
    fab.close();
  }

}
