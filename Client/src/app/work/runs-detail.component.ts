import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkItem } from './work-item';
import { RestfulService } from '../restful.service'
import { BASEURL } from '../constants'
import { Socket } from 'ng-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-runs-detail',
  templateUrl: 'runs-detail.html'
})
export class RunsDetailComponent {
  @Input('run') set _workItem(value: WorkItem) {
    this.selectedWorkItem = (<any>Object).assign({}, value);
  }
  @Input('isAllowed') isAllowed: boolean;
  @Output() cancelled = new EventEmitter();
  @Output() selected = new EventEmitter();
  selectedWorkItem: WorkItem;
  socket: Socket;
  runDetails: any;
  test: any;

  constructor(private restService: RestfulService, private _socket: Socket, private router: Router) {
    this.socket = _socket;
  } // constructor

  ngOnInit() {
    console.log(this.isAllowed);
    this.runDetails = this.selectedWorkItem;

    this.socket.on('checkPicker', function() {
      this.socket.emit('doIPick', localStorage.getItem('token'));
    }.bind(this));

    //Socket Io listeners
    this.socket.on('notifyPicker', function(_isAllowed) {
      console.log('pick data = ' + _isAllowed);
      this.isAllowed = _isAllowed;
    }.bind(this));
  }

  removeRun(id: number, callback) {
    this.socket.emit('select.run', id);
    callback();
  }

  selectRun(workid: number)
  {
    this.restService.selectRun(BASEURL, workid).subscribe(payload => {
        console.log(payload);
        console.log(workid);
        //this.socket.emit('select.run', workid);
        var _router = this.router;
        this.removeRun(workid, function () {
          _router.navigate(['home']);
        });
      },
      err => {
        //this.msg = 'Invalid user name or password';
      });
  }
}
