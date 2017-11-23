/**
 * Created by matth on 2017-09-27.
 */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('Testing canActivate');
    if (localStorage.token) {  // check for valid session here
      return true;
    }

    this.router.navigate(['login']);

    return false;
  }

}
