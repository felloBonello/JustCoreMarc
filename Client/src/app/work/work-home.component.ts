import { Component, OnInit } from '@angular/core';

import { WorkItem } from './work-item';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';
import { UpdateFlagService } from '../updateflag.service'

@Component({
  selector: 'app-work',
  templateUrl: 'work-home.html'
})
export class WorkHomeComponent implements  OnInit {
  workItems: Array<WorkItem>;
  selectedWorkItem: WorkItem;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  constructor(private restService: RestfulService, private updateFlag: UpdateFlagService) {
    this.hideEditForm = true;
  } // constructor

  ngOnInit() {
    this.msg = '';
    this.restService.load(BASEURL + '/workItems').subscribe(payload => {
        this.workItems = payload;
        this.msg += ' work items loaded';
      },
      err => {this.msg += 'Error occurred - work items not loaded - ' + err.status + ' - ' +
        err.statusText;
      });

    this.updateFlag.update();
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
