import { Component, OnInit } from '@angular/core';

import { WorkItem } from './work-item';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';

@Component({
  selector: 'app-work',
  templateUrl: 'work-home.html'
})
export class WorkHomeComponent implements  OnInit {
  workItems: Array<WorkItem>;
  selectedWorkItem: WorkItem;
  hideRunTable: boolean;
  msg: string;
  todo: string;
  url: string;
  constructor(private restService: RestfulService) {
    this.hideRunTable = true;
  } // constructor

  ngOnInit() {
    this.msg = '';
    this.restService.load(BASEURL + '/workItems').subscribe(payload => {
        this.workItems = payload;
        this.msg += 'Loaded a list of Work Items';
      },
      err => {this.msg += 'Error occurred - Work Items List not loaded - ' + err.status + ' - ' +
        err.statusText;
      });
  }

  select(workItem: WorkItem) {
    this.todo = 'update';
    this.selectedWorkItem = workItem;
    this.msg = 'Work Item Group, No.' + workItem.workId + ' Selected';
    this.hideRunTable = !this.hideRunTable;
  } // select

  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string) {
    if (msg) {
      this.msg = 'Loaded a list of Work Items';
    }
    this.hideRunTable = !this.hideRunTable;
  } // cancel

} // WorkHomeComponent class
