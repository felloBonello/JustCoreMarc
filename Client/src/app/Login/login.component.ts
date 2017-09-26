/**
 * Created by matth on 2017-09-25.
 */
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Credentials} from './credentials';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';

@Component({
  selector: 'app-exercises',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  frmusername: FormControl;
  frmpassword: FormControl;
  loginCredentials: Credentials;
  msg: string;

  constructor(private builder: FormBuilder, private restService: RestfulService) {
    this.frmusername = new FormControl('', Validators.compose([Validators.required]));
    this.frmpassword = new FormControl('', Validators.compose([Validators.required]));
    this.loginCredentials = {username: '', password: ''};
    this.msg = '';
  } // constructor

  ngOnInit() {
    this.loginForm = this.builder.group({
      frmusername: this.frmusername,
      frmpassword: this.frmpassword,
    });
  } // ngOnInit

  /**
   * login - send changed update to service update local array
   */
  login(credentials: Credentials) {
    this.restService.login(BASEURL, credentials).subscribe(payload => {
        this.msg = payload['message'];
      },
      err => {
        this.msg = 'Error - ' + err.status + ' - ' + err.statusText;
      });
  } // login

} // class LoginComponent