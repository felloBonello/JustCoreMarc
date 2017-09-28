import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdToolbarModule } from '@angular/material';
import { LoginComponent } from './login.component';

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule
  ],
  declarations: [LoginComponent],
  exports:      [LoginComponent]
})
export class LoginModule {}
