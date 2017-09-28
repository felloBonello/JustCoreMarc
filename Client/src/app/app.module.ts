import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CovalentLayoutModule, CovalentStepsModule } from '@covalent/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';
import { WorkModule } from './work/work.module';
import { routing } from './app.routing';
import { RestfulService } from './restful.service';
import { AuthGuard } from './auth-guard'

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    RouterModule,
    LoginModule,
    WorkModule,
    routing
  ],
  providers: [RestfulService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
