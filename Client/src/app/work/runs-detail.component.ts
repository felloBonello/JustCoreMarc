import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkItem } from './work-item';

@Component({
  selector: 'app-runs-detail',
  templateUrl: 'runs-detail.html'
})
export class RunsDetailComponent {
  @Input('run') set _workItem(value: WorkItem) {
    this.selectedWorkItem = (<any>Object).assign({}, value);
  }
  @Input() workItems: WorkItem[];
  @Output() cancelled = new EventEmitter();
  selectedWorkItem: WorkItem;
}