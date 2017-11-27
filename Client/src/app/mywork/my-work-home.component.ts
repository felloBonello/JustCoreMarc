import { Component, OnInit } from '@angular/core';

import { WorkItem } from './my-work-item';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';

@Component({
  selector: 'app-work',
  templateUrl: 'my-work-home.html'
})
export class MyWorkHomeComponent implements  OnInit {
  workItems: Array<WorkItem>;
  selectedWorkItem: WorkItem;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  constructor(private restService: RestfulService) {
    this.hideEditForm = true;
  } // constructor

  ngOnInit() {
    this.msg = '';
    this.restService.load(BASEURL + '/workItems/me').subscribe(payload => {
        this.workItems = payload.workItems;
        this.msg += ' My Work Items loaded';
      },
      err => {this.msg += 'Error occurred - work items not loaded - ' + err.status + ' - ' +
        err.statusText;
      });
  }

  select(workItem: WorkItem) {
    this.todo = 'update';
    this.selectedWorkItem = workItem;
    this.msg = 'Work item ' + workItem.workId + ' selected';
    this.hideEditForm = !this.hideEditForm;
  } // select

  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string) {
    if (msg) {
      this.msg = 'Operation cancelled';
    }
    this.hideEditForm = !this.hideEditForm;
  } // cancel

} // WorkHomeComponent class
