import { Component, OnInit, Input } from '@angular/core';

import { WorkItem } from './work-item';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';
import { Socket } from 'ng-socket-io';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-work',
  templateUrl: 'work-home.html'
})
export class WorkHomeComponent implements OnInit {

  workItems: Array<WorkItem>;
  selectedWorkItem: WorkItem;
  hideRunTable: boolean;
  msg: string;
  todo: string;
  socket: Socket;
  isAllowed: boolean;

  constructor(private restService: RestfulService, private _socket: Socket, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.hideRunTable = true;
    this.toastr.setRootViewContainerRef(vcr);
    this.socket = _socket;
  } // constructor


  ngOnInit() {
    //Socket Io listeners
    this.socket.on('notifyPicker', function(_isAllowed) {
      console.log('pick data = ' + _isAllowed);
      this.isAllowed = _isAllowed;
      if (this.isAllowed) {
        this.toastr.custom('<span style="color: red">I am a mother fucking TOASTER</span>', null, {enableHTML: true});
      }
    }.bind(this));
    //Ask server if it is your turn to pick.
    this.socket.emit('doIPick', localStorage.getItem('token'));

    this.socket.on('remove.run', function(_id) {
      console.log('pick data = ' + _id);
      for(var i = 0; i < this.workItems.length; i++) {
        var obj = this.workItems[i];
        if(obj.workId == _id) {
          this.workItems.splice(this.workItems.indexOf(obj), 1);
           return;
        }
      }
    }.bind(this));

    this.msg = '';
    this.restService.load(BASEURL + '/workItems').subscribe(payload => {
      this.workItems = payload.workItems;
      this.msg += ' Available Work Items loaded';
    },
      err => {
      this.msg += 'Error occurred - Work Items List not loaded - ' + err.status + ' - ' +
        err.statusText;
      });
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
