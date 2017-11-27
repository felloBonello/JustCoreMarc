import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkItem } from './work-item';
import { RestfulService } from '../restful.service'
import { UpdateFlagService } from '../updateflag.service'
import { BASEURL } from '../constants'

@Component({
  selector: 'app-runs-detail',
  templateUrl: 'runs-detail.html'
})
export class RunsDetailComponent {
  @Input('run') set _workItem(value: WorkItem) {
    this.selectedWorkItem = (<any>Object).assign({}, value);
  }
  @Output() cancelled = new EventEmitter();
  @Output() selected = new EventEmitter();
  selectedWorkItem: WorkItem;
  runDetails: any;
  test: any;

  constructor(private restService: RestfulService, private updateFlag: UpdateFlagService) { } // constructor

  ngOnInit() {
    this.runDetails = this.selectedWorkItem;
  }

  selectRun(workid: number)
  {
    this.restService.selectRun(BASEURL, workid).subscribe(payload => {
        console.log(payload);
        console.log(workid);
        if(payload.affectedRows == 1)
        {
          this.updateFlag.update();
        }
      },
      err => {
        //this.msg = 'Invalid user name or password';
      });
  }
}
