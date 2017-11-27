import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyWorkHomeComponent } from './my-work-home.component';
import { MyWorkTableComponent } from './my-work-table.component';
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

  declarations: [MyWorkHomeComponent, MyWorkTableComponent],
  exports: [MyWorkHomeComponent]
})
export class MyWorkModule {}
