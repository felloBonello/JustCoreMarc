import { Component, Input } from '@angular/core';
import { WorkItem } from './work-item';

@Component({
  selector: 'app-runs-detail',
  templateUrl: 'runs-detail.html'
})
export class RunsDetailComponent {
  @Input('run') set _workItem(value: WorkItem) {
    this.selectedRuns = (<any>Object).assign({}, value);
  }
  @Input() workItems: WorkItem[];
  selectedRuns: WorkItem;
}
