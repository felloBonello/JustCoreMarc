import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WorkHomeComponent } from './work-home.component';
import { WorkTableComponent } from './work-table.component';
import { RunsDetailComponent } from './runs-detail.component';
import { CovalentDataTableModule } from '@covalent/core';
import {
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTooltipModule,
  MatTableModule,
} from '@angular/material';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    CovalentDataTableModule
  ],

  declarations: [RunsDetailComponent, WorkHomeComponent, WorkTableComponent],
  exports: [WorkHomeComponent]
})
export class WorkModule {}
