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
  hideRunTable: boolean;
  msg: string;
  todo: string;
  constructor(private restService: RestfulService, private updateFlag: UpdateFlagService) {
    this.hideRunTable = true;
  } // constructor

  ngOnInit() {
    this.msg = '';
    this.restService.load(BASEURL + '/workItems').subscribe(payload => {
        this.workItems = payload.workItems;
        this.msg += ' Available Work Items loaded';
      },
      err => {this.msg += 'Error occurred - Work Items List not loaded - ' + err.status + ' - ' +
        err.statusText;
      });

    this.updateFlag.update();
  }

  select(workItem: WorkItem) {
    this.todo = 'details';
    this.selectedWorkItem = workItem;
    this.msg = 'Showing run details from group No.' + workItem.workId + '.';
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
