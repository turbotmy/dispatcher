import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AddressServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
import { Address} from './address';

@Injectable()
export class AddressServiceProvider {
  private addresses: Address[] = [];

  constructor(public http: Http) {
    console.log('Hello AddressServiceProvider Provider');
    this.addresses.push(new Address(1, 'Home', '15 Jalan Anggerik Aranda 31/6', '', 'Kota Kemuning', 'Shah Alam', '40460', '', '', "3.0015283","101.5442709" ));
    this.addresses.push(new Address(2, 'Second', '315 Muchado HIll Rd', '', 'Alton', 'NH', '50400', '', '', "3.0015283","101.5442709"));
    this.addresses.push(new Address(3, 'Third', 'Hume Rd', '', 'Alton', 'NH', '87299', '', '',"3.0015283","101.5442709"));
  }

  fetchAll() : Promise<Address[]>{
    var p = Promise.resolve<Address[]>(this.addresses);
    return p;
  }
}
