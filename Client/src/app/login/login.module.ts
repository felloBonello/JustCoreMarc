import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { LoginComponent } from './login.component';

@NgModule({
  imports:      [
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ],
  declarations: [LoginComponent],
  exports:      [LoginComponent]
})
export class LoginModule {}
