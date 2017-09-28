import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Work } from './work';
@Component({
  selector: 'app-work-table',
  templateUrl: 'work-table.html'
})
export class WorkTableComponent {
  @Input() works: Work[];
  @Output() selected = new EventEmitter();
  sortedWorks: Work[];
  sortOrder: boolean = true;
  sortedColumn: string = 'id';

  sortExpenses(col) {
    this.sortedColumn = col;
    this.sortOrder = !this.sortOrder;
    this.sortedWorks = this.works.slice(0);
    if (this.sortOrder) { // ascending
      this.sortedWorks.sort((left, right): number => {
        if (left[col] < right[col]) {
          return -1;
        }
        if (left[col] > right[col]) {
          return 1;
        }
        return 0;
      });
    } else { // descending
      this.sortedWorks.sort((left, right): number => {
        if (left[col] > right[col]) {
          return -1;
        }
        if (left[col] < right[col]) {
          return 1;
        }
        return 0;
      });
    }
    this.works = this.sortedWorks;
  }
}
