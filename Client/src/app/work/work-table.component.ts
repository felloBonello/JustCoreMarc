import { Component, Input, Output, EventEmitter } from '@angular/core';

import { WorkItem } from './work-item';

@Component({
  selector: 'app-work-table',
  templateUrl: 'work-table.html'
})

export class WorkTableComponent {
  @Input() workItems: WorkItem[];
  @Output() selected = new EventEmitter();
  @Output() newed = new EventEmitter();
  sortedWorkItems: WorkItem[];
  sortOrder = true;
  sortedColumn = 'workId';

  /**
   * sortWorkItems - sort based on column clicked, toggle between ascending/descending
   *  return negative if the first item is smaller;
   *  positive if it it's larger, or if it's zero if they're equal.
   */
  sortWorkItems(col) {
    this.sortedColumn = col;
    this.sortOrder = !this.sortOrder;
    this.sortedWorkItems = this.workItems.slice(0);

    if (this.sortOrder) { // ascending
      this.sortedWorkItems.sort((left, right): number => {
        if (left[col] < right[col]) {
          return -1;
        }
        if (left[col] > right[col]) {
          return 1;
        }
        return 0;
      });
    } else { // descending
      this.sortedWorkItems.sort((left, right): number => {
        if (left[col] > right[col]) {
          return -1;
        }
        if (left[col] < right[col]) {
          return 1;
        }
        return 0;
      });
    }
    this.workItems = this.sortedWorkItems;
  } // sortWorkItems
} // WorkTableComponent
