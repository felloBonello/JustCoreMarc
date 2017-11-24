/**
 * Created by matth on 2017-11-23.
 */
/**
 * Created by matth on 2017-09-25.
 */
import {Injectable} from '@angular/core';
import { RestfulService } from './restful.service';
import { BASEURL } from './constants';

@Injectable()
export class UpdateFlagService {

  constructor(private restService: RestfulService) { } // constructor
  /**
   * update - send changed update to service update local array
   */
  update() {
    console.log("Winning");
    this.restService.load(BASEURL + '/userinfo').subscribe(payload => {
        localStorage.setItem('isAllowed', payload.decoded.isAllowed);
      },
      err => {console.log('Error occurred - isAllowed not loaded - ' + err.status + ' - ' + err.statusText);
      });
    return "";
  } // login

} // class LoginComponent
