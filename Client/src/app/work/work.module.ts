import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdSelectModule, MdButtonModule, MdInputModule,
  MdToolbarModule, MdIconModule, MdCardModule, MdTooltipModule } from '@angular/material';
import { CovalentDataTableModule } from '@covalent/core';
import { WorkHomeComponent } from './work-home.component';
import { WorkTableComponent } from './work-table.component';
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MdSelectModule,
    MdInputModule,
    MdCardModule,
    MdButtonModule,
    MdToolbarModule,
    MdTooltipModule,
    MdIconModule,
    CovalentDataTableModule
  ],

  declarations: [WorkHomeComponent, WorkTableComponent],
  exports: [WorkHomeComponent]
})
export class WorkModule {}
