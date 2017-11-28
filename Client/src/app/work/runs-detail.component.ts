import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkItem } from './work-item';
import { RestfulService } from '../restful.service'
import { BASEURL } from '../constants'

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
  runDetails: any;
  test: any;

  constructor(private restService: RestfulService) { } // constructor

  ngOnInit() {
    console.log(this.isAllowed);
    this.runDetails = this.selectedWorkItem;
  }

  selectRun(workid: number)
  {
    this.restService.selectRun(BASEURL, workid).subscribe(payload => {
        console.log(payload);
        console.log(workid);
      },
      err => {
        //this.msg = 'Invalid user name or password';
      });
  }
}
