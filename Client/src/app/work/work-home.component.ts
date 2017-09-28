import { Component, OnInit } from '@angular/core';
import { Work } from './work';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';
@Component({
  selector: 'app-work',
  templateUrl: 'work-home.html',
})
export class WorkHomeComponent implements OnInit {
  works: Array<Work>;
  hideEditForm: boolean;
  msg: string;
  url: string;
  constructor(private restService: RestfulService) {
    this.hideEditForm = true;
    this.url = BASEURL + '/runs';
  }
  ngOnInit() {
    this.msg = 'Loading the list of work items from the server, Please wait.';
    this.restService.load(this.url).subscribe(payload => {
        this.works = payload;
        this.msg = ' Work Items Loaded';
      },
      err => {
        this.works = [];
        this.msg = 'Error - Work Items Not Loaded - ' + err.status + ' - ' + err.statusText;
      });
  }
}
